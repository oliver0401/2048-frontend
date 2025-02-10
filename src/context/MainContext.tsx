import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TSignIn, TSignUp, TUser } from '../types';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../consts';
import useLocalStorage from '../hooks/useLocalStorage';
import { LOCAL_URL } from '../consts/config';
import { generateMnemonic } from 'bip39';
import { ethers } from 'ethers';

interface MainContextType {
  user: TUser | null;
  setUser: (user: TUser | null) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  handleSignIn: (user: TSignIn) => Promise<void>;
  handleSignUp: (user: TSignUp) => Promise<void>;
  token: string;
  setToken: (token: string) => void;
  handleGetUser: () => Promise<void>;
  mnemonic: string[];
  setMnemonic: (mnemonic: string[]) => void;
  handleConfirmStoreSeed: (seed: string) => Promise<void>;
  handleSignOut: () => void;
}


const MainContext = createContext<MainContextType | undefined>(undefined);

export const MainProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<TUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useLocalStorage('token', '');
  const [mnemonic, setMnemonic] = useState<string[]>([]);

  const handleSignIn = async (user: TSignIn) => {
    try {
      const { data } = await api().post('/auth/signin', user);
      setToken(data.token);
      setIsAuthenticated(true);
      setUser(data.user);
      
      if (data.user.address !== null) {
        navigate(PATH.GAME);
      } else {
        const { data: seedData } = await api(LOCAL_URL).post('/get-seed', {
          email: user.email,
          password: user.password,
        });
        setMnemonic(seedData.split(' '));
        navigate(PATH.ADDRESS);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignUp = async (user: TSignUp) => {
    try {
      await api().post('/auth/signup', user);
      const { password, email } = user;
      const seed = generateMnemonic(128);
      await api(LOCAL_URL).post('/store-seed', { seed, password, email });
      navigate(PATH.SIGN_IN);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetUser = async () => {
    try {
      const { data } = await api().get('/auth');
      setUser(data.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
      setUser(null);
      setIsAuthenticated(false);
      navigate(PATH.SIGN_IN);
    }
  };

  const handleConfirmStoreSeed = async (seed: string) => {
    try {
      const wallet = ethers.Wallet.fromPhrase(seed);
      const address = wallet.address;
      await api().put('/auth', { address });
      if (user) {
        setUser({ ...user, address });
        navigate(PATH.GAME);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignOut = () => {
    setUser(null);
    setIsAuthenticated(false);
    setToken('');
    navigate(PATH.SIGN_IN);
  };

  return (
    <MainContext.Provider

      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        handleSignIn,
        handleSignUp,
        token,
        setToken,
        handleGetUser,
        mnemonic,
        setMnemonic,
        handleConfirmStoreSeed,
        handleSignOut,
      }}
    >
      {children}

    </MainContext.Provider>
  );
};

export const useMainContext = () => {
  const context = useContext(MainContext);
  if (context === undefined) {
    throw new Error('useMainContext must be used within a MainProvider');
  }
  return context;
};
