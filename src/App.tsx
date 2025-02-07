import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Game, Home } from './pages';
import { PATH } from './consts';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATH.GAME} element={<Game />} />
        <Route path={PATH.HOME} element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};
