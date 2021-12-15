import React from 'react'
import styled from 'styled-components'

function Message({userImage, user, timestamp, id, message}) {
    return (
        <MessageContainer>
           <img src={userImage} alt="" />
           <MessageInfo>
                <h4>
                    {user}{' '}
                    <span>{new Date(timestamp?.toDate()).toUTCString()}</span>   
                    <p>{message}</p>
                </h4>   
            </MessageInfo> 
        </MessageContainer>
    )
}

export default Message

const MessageContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;

    > img {
        border-radius: 50px;
        height: 50px;
    }
`;

const MessageInfo = styled.div`
    padding-left: 10px;
    
    > h4 > span {
        color: gray;
        font-size: 10px;
        margin-left: 4px;
        font-weight: 300;
    }

    > h4 > p {
        font-size: 13px;
        font-weight: 500;
    }
`;