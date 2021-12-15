import { Button } from '@material-ui/core';
import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import { auth, db } from '../firebase';


function ChatInput({ channelName, channelId, chatRef }) {

    // const inputRef = useRef(null); -- use reference
    const [input, setInput] = useState("") ;

    const [user] = useAuthState(auth);

    const setText = (e) => setInput(e.target.value);

    const sendMessage = e => {
        e.preventDefault(); // Prevents refresh
        if (!channelId) {
            return false;
        }

        // get the room reference and then add a collectio called messages
        const roomRef = doc(db, 'rooms', channelId);

        // add the document to the messages reference.
        addDoc(collection(roomRef, "messages"), {
            // message: inputRef.current.value,
            message: input,
            timestamp: serverTimestamp(),
            user: user.displayName,
            userImage: user.photoURL
        });

        // go to the reference
        chatRef?.current?.scrollIntoView({
            behavior: "smooth"
        })

        setInput("");
    }

    return (
        <ChatInputContainer>
            <form>
                {/* <input placeholder={`Message #ROOM`} ref={inputRef} /> */}
                <input placeholder={`Message #${channelName}`} value={input} onChange={setText} />
                <Button hidden type='submit' onClick={sendMessage}>
                    SEND
                </Button>
            </form>
        </ChatInputContainer>
    )
}

export default ChatInput;

const ChatInputContainer = styled.div`
    border-radius: 20px;

    > form {
        position: relative;
        display: flex;
        justify-content: center;
    }

    > form > input {
        position: fixed;
        bottom: 30px;
        width: 60%;
        border: 1px solid gray;
        border-radius: 3px;
        padding: 20px;
        outline: none;
    }
    
    > form > button {
        display: none;
    }
`;
