import React from 'react'
import styled from 'styled-components';
import { Avatar } from '@material-ui/core';
import { AccessTime } from '@material-ui/icons';
import { Search } from '@material-ui/icons';
import { Help } from '@material-ui/icons';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

function Header() {

    const [user] = useAuthState(auth);
    const signOut = (e) => {
        e.preventDefault();
        if(window.confirm("Do you want to sign out?")){
            auth.signOut();
        }else {
            return false;
        }
    }
    return (
        <HeaderContainer>
            <HeaderLeft>
                <HeaderAvatar onClick={signOut} src={user?.photoURL} alt={user?.displayName}/>
                <AccessTime />
            </HeaderLeft>
            
            <HeaderSearch>
                <Search />
                <input type="text" placeholder="Search" />
            </HeaderSearch>

            <HeaderRight>
                <Help />
            </HeaderRight>

        </HeaderContainer>
    )
}

export default Header


const HeaderContainer = styled.div`
    display: flex;
    position: fixed;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    background-color: var(--slack-color);
    color: white;
`;

const HeaderLeft = styled.div`
    flex: 0.3;
    display: flex;
    align-items: center;
    margin-left: 20px;

    > .MuiSvgIcon-root {
        margin-left: auto;
        margin-right: 30px;
    }
`;

const HeaderAvatar = styled(Avatar)`
    cursor: pointer;

    :hover {
        opacity: 0.8;
    }
`;


const HeaderSearch = styled.div`
    flex: 0.4;
    opacity: 1;
    border-radius: 6px;
    border-color: grey;
    display: flex;
    border: 1px gray solid;

    > input {
        background-color: transparent;
        text-align: center;
        min-width: 30vw;
        border: none;
        outline: 0;
        color: white;

    }

`;

const HeaderRight = styled.div`
    flex: 0.3;
    display: flex;
    align-items: flex-end;

    > .MuiSvgIcon-root {
        margin-left: auto;
        margin-right: 20px;
    }




`;

