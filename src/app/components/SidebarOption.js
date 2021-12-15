import { addDoc, collection } from 'firebase/firestore';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { enterRoom } from '../../features/appSlice';
import { db } from '../firebase';

function SidebarOption({ Icon, title, addChannelOption, id}) {
    // console.log(id)
    const dispatch = useDispatch();

    const addChannel = () => {
        const channelName = prompt('Please enter the channel name')
        if (channelName) {
            try {
                addDoc(collection(db, "rooms"), {
                    name: channelName
                });
            } catch (e) {
                console.error("Error creating the room", channelName);
            }

        }
    };

    const selectChannel = () => {
        if (id) {
            dispatch(enterRoom({
                roomId: id
            }));
        }

    };

    return (
        <SidebarOptionContainer
            onClick={addChannelOption ? addChannel : selectChannel}>
            {Icon && <Icon fontSize='small' style={{ padding: 10 }} />}
            {Icon ? (
                <h3>{title}</h3>
            ) : (<SidebarOptionChannel>
                <span>#</span> {title}
            </SidebarOptionChannel>
            )}
        </SidebarOptionContainer>
    )
}

export default SidebarOption

const SidebarOptionContainer = styled.div`
    display: flex;
    font-size: 12px;
    cursor: pointer;
    font-weight: 400;
    align-items: center;

    : hover {
            opacity: 0.9;
            background-color: #340e36;
    }
    
    > h3 {
        font-weight: 500;
    }

    > span {
        font-weight: 500;
    }
`;

const SidebarOptionChannel = styled.h3`
    padding: 10px 10px;
    font-weight: 13px;
    font-weight: 300px

    > span {
        font-weight: 500;
    }

    : hover {
        cursor: pointer;
    }

`;