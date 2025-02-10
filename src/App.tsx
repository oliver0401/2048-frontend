import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Game, Home, SignIn, SignUp, Address } from './pages';
import { PATH } from './consts';
import './index.css';
import { PrivateRoute } from './components/PrivateRoute';
import { MainProvider } from './context/MainContext';
import { Wallet } from './pages/Wallet';

export const App = () => {
  return (
    <BrowserRouter>
      <MainProvider>
        <Routes>
          <Route path={PATH.GAME} element={<PrivateRoute Page={Game} />} />
          <Route path={PATH.ADDRESS} element={<PrivateRoute Page={Address} />} />
          <Route path={PATH.HOME} element={<Home />} />
          <Route path={PATH.SIGN_UP} element={<SignUp />} />
          <Route path={PATH.SIGN_IN} element={<SignIn />} />
          <Route path={PATH.WALLET} element={<Wallet />} />
        </Routes>
      </MainProvider>
    </BrowserRouter>

  );
};
