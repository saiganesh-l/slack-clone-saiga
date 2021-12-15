import { Add, Apps, BookmarkBorder, Drafts, ExpandLess, ExpandMore, FiberManualRecord, FileCopy, Inbox, InsertComment, PeopleAlt } from '@material-ui/icons';
import React from 'react';
import styled from 'styled-components';
import { Create } from '@material-ui/icons';
import SidebarOption from './SidebarOption';
import { auth, db } from '../firebase';
import {collection} from 'firebase/firestore'
import {useCollection} from 'react-firebase-hooks/firestore'
import { useAuthState } from 'react-firebase-hooks/auth';



function Sidebar() {

    const [channels] = useCollection(collection(db, "rooms"));
    const [user] = useAuthState(auth);
    return (
        <SidebarContainer>
            <SidebarHeader>
                <SidebarInfo>
                    <h2>Saiga Slack</h2>
                    <h3>
                        <FiberManualRecord />
                        {user?.displayName}
                    </h3>
                </SidebarInfo>
                <Create/>
            </SidebarHeader>
            <SidebarOption Icon={InsertComment} title="Threads"/>
            <SidebarOption Icon={Inbox} title="Mentions & reactions"/>
            <SidebarOption Icon={Drafts} title="Saved items"/>
            <SidebarOption Icon={BookmarkBorder} title="Channel Browser"/>
            <SidebarOption Icon={PeopleAlt} title="People & user groups"/>
            <SidebarOption Icon={Apps} title="Apps"/>
            <SidebarOption Icon={FileCopy} title="File browser"/>
            <SidebarOption Icon={ExpandLess} title="Show less"/>
            <hr/>
            <SidebarOption Icon={ExpandMore} title="Channels"/>
            <hr/>
            <SidebarOption Icon={Add} title="Add Channel" addChannelOption/>

            {channels?.docs.map(doc=> 
            (
                <SidebarOption key={doc.id} id={doc.id} title={doc.data().name}/>
            ))}
        </SidebarContainer>        
    )
}

export default Sidebar

const SidebarContainer = styled.div`
    color: white;
    flex: 0.3;
    height: 100vh;
    background-color: var(--slack-color);
    border-top: 1px solid #49274b;
    max-width: 260px;
    margin-top: 60px;

    > hr {
        margin-top: 10px;
        margin-bottom: 10px;
        border: 1px solid #49274b;
    }

`;

const SidebarHeader = styled.div`
    display: flex;
    border-bottom: 1px solid 49274b;
    padding: 13px;

    > .MuiSvgIcon-root {
        padding: 8px;
        color: #49274b;
        font-size: 18px;
        background-color: white;
        border-radius: 999px;
        
        :hover {
            cursor: pointer;
        }
        

    }
`;

const SidebarInfo = styled.div`
    flex: 1;
    padding-bottom: 10px;
    border-bottom: 1px solid #49274b;

    > h2 {
        font-size: 15px;
        font-weight: 900;
        margin-bottom: 5px;
    }

    > h3 {
        font-size: 13px;
        display: flex;
        font-weight: 400;
        align-items: center;
    }

    > h3 > .MuiSvgIcon-root {
        font-size: 14px;
        margin-top: 1px;
        margin-right: 2px;
        color: green;
    }
`;





