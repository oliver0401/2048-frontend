import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Game, Home, SignIn, SignUp } from './pages';
import { PATH } from './consts';
import './index.css';


export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATH.GAME} element={<Game />} />
        <Route path={PATH.HOME} element={<Home />} />
        <Route path={PATH.SIGN_UP} element={<SignUp />} />
        <Route path={PATH.SIGN_IN} element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
};
