import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import {
  Game,
  Home,
  SignIn,
  SignUp,
  Address,
  Profile,
  Leaderboard,
  Wallet,
  Shop,
  WalletRecover,
} from './pages';
import { PATH } from './consts';
import './index.css';
import { PrivateRoute } from './components/PrivateRoute';
import { MainProvider, GameProvider, Web3Provider } from './context';

export const App = () => {
  return (
    <BrowserRouter>
      <MainProvider>
        <Web3Provider>
          <GameProvider>
            <Routes>
              <Route path={PATH.GAME} element={<PrivateRoute Page={Game} />} />
              <Route
                path={PATH.ADDRESS}
                element={<PrivateRoute Page={Address} />}
              />
              <Route path={PATH.HOME} element={<Home />} />
              <Route path={PATH.SIGN_UP} element={<SignUp />} />
              <Route path={PATH.SIGN_IN} element={<SignIn />} />
              <Route
                path={PATH.WALLET_RECOVER}
                element={<PrivateRoute Page={WalletRecover} />}
              />
              <Route
                path={PATH.PROFILE}
                element={<PrivateRoute Page={Profile} />}
              />
              <Route path={PATH.SHOP} element={<PrivateRoute Page={Shop} />} />
              <Route
                path={PATH.LEADERBOARD}
                element={<PrivateRoute Page={Leaderboard} />}
              />
              <Route
                path={PATH.WALLET}
                element={<PrivateRoute Page={Wallet} />}
              />
            </Routes>
          </GameProvider>
        </Web3Provider>
      </MainProvider>
      <ToastContainer 
        position="bottom-right" 
        autoClose={5000} // Toast disappears after 3 seconds
        hideProgressBar={false} // Show progress bar
        newestOnTop={false} // Keep the latest toast at the bottom
        closeOnClick
        rtl={false} // Right to Left (for languages like Arabic)
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" // Options: "light", "dark", "colored"        
      />
    </BrowserRouter>
    
  );
};
