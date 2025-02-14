import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Game, Home, SignIn, SignUp, Address, Profile } from './pages';
import { PATH } from './consts';
import './index.css';
import { PrivateRoute } from './components/PrivateRoute';
import { MainProvider,GameProvider } from './context';
import { Wallet } from './pages/Wallet';
import { Shop } from './pages/Shop';

export const App = () => {
  return (
    <BrowserRouter>
      <MainProvider>
        <GameProvider>
          <Routes>
            <Route path={PATH.GAME} element={<PrivateRoute Page={Game} />} />
            <Route path={PATH.ADDRESS} element={<PrivateRoute Page={Address} />} />
            <Route path={PATH.HOME} element={<Home />} />
            <Route path={PATH.SIGN_UP} element={<SignUp />} />
            <Route path={PATH.SIGN_IN} element={<SignIn />} />
            <Route path={PATH.WALLET} element={<Wallet />} />
            <Route path={PATH.PROFILE} element={<PrivateRoute Page={Profile} />} />
            <Route path={PATH.SHOP} element={<PrivateRoute Page={Shop} />} />
          </Routes>
        </GameProvider>
      </MainProvider>
    </BrowserRouter>
  );
};
