import React, { useEffect, useRef } from 'react';
import styled from "styled-components";
import StarBorderOutlined from '@material-ui/icons/StarBorderOutlined'
import InfoIcon from '@material-ui/icons/Info';
import { selectRoomId } from '../../features/appSlice';
import { useSelector } from 'react-redux';
import ChatInput from './ChatInput';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import { collection, doc, query, orderBy } from 'firebase/firestore';
import Message from './Message';


function Chat() {
    const chatRef = useRef(null);
    const roomId = useSelector(selectRoomId);
    const [roomDetails] = useDocument(
        roomId && doc(db, 'rooms', roomId)
    );

    const [roomMessages, loading] = useCollection(
        roomId && query(collection(doc(collection(db, 'rooms'), roomId), "messages"), orderBy("timestamp"))
    );

    useEffect(() => {
        chatRef?.current?.scrollIntoView();
    }, [loading, roomId])

    return (
        <ChatContainer>
            {roomDetails && roomMessages && (
                <>
                    <Header>
                        <HeaderLeft>
                            <span>#</span> {roomDetails?.data().name}
                            <StarBorderOutlined />
                        </HeaderLeft>
                        <HeaderRight>
                            <InfoIcon />
                            <span>Details</span>
                        </HeaderRight>
                    </Header>


                    <ChatMessages>
                        {roomMessages?.docs.map(doc => {
                            const { message, timestamp, user, userImage } = doc.data();
                            return (
                                <Message
                                    key={doc.id}
                                    message={message}
                                    timestamp={timestamp}
                                    user={user}
                                    userImage={userImage} />
                            )
                        })}

                        <ChatBottom ref={chatRef} />

                    </ChatMessages>
                    <ChatInput chatRef={chatRef} channelId={roomId} channelName={roomDetails?.data().name} />
                </>
            )}
        </ChatContainer>
    )
}

export default Chat

const ChatMessages = styled.div`
    position: relative;
    overflow-y: scroll;
    height: 80%
`;

const ChatBottom = styled.div`
    padding-bottom: 200px;
`;

const ChatContainer = styled.div`
    margin-top: 120px;
    flex: 0.7;


`;

const Header = styled.div`
    display: flex;
    margin-top: 20px;
    padding-bottom: 20px;
    justify-content: space-between;
    border-bottom: 1px solid gray;
`;

const HeaderLeft = styled.div`
    display: flex;
    font-size: 15px;
    font-weight: 400;
    align-items: center;
    text-transform: lowercase;
    margin-left: 10px;
    font-weight: 500;


    > .MuiSvgIcon-root {
        margin-right: 30px;
        margin-left: 10px;
        align-items: center;
        
    }

    > span {
        margin-right: 5px;
    }

`;

const HeaderRight = styled.div`
    display: flex;
    align-items: center;
    font-weight: 400;
    font-size: 12px;

    > .MuiSvgIcon-root {
        margin-left: auto;
        margin-right: 10px;
    }


`;

