import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Header from './app/components/Header'
import Chat from './app/components/Chat';
import About from './app/components/About';
import styled from 'styled-components';
import Sidebar from './app/components/Sidebar';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from './app/firebase';
import Login from './app/components/Login';

function App() {

  const [user, loading] = useAuthState(auth);

  if(loading) {
    return (
      <AppLoading>
        <AppLoadingContents>
          <img src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd-970-80.jpg.webp" alt=""></img>
        </AppLoadingContents>
      </AppLoading>
    )
  }

  return (

    <div className="app">
      {!user ? <Login /> : (
        <>
          <Header />
          <AppBody>
            <Sidebar />
            <Router>

              <Routes>
                <Route path="/" exact element={<Chat />} />
                <Route path="/about" exact element={<About />} />
              </Routes>

            </Router>
          </AppBody>
        </>
      )}
    </div>
  );
}

export default App;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;

const AppLoading = styled.div``;

const AppLoadingContents = styled.div``;