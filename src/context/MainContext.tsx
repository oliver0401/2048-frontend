import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
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
  handleGetPrivateKey: (email: string, password: string) => Promise<string>;
}

const MainContext = createContext<MainContextType | undefined>(undefined);

// Add a utility function for error logging
const logError = (error: any) => {
  console.error(error);
};

export const MainProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<TUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useLocalStorage('token', '');
  const [mnemonic, setMnemonic] = useState<string[]>([]);
  const [password, setPassword] = useLocalStorage('password', '');

  const handleSignIn = async (signIn: TSignIn) => {
    try {
      const { data } = await api().post('/auth/signin', signIn);
      setPassword(signIn.password);
      setToken(data.token);
      setIsAuthenticated(true);
      setUser(data.user);
      try {
        const { data: walletData } = await api(LOCAL_URL).post('/get-seed', {
          ...signIn,
        });
        if (!walletData.confirm) {
          // first login
          setMnemonic(walletData.seed.split(' '));
          navigate(PATH.ADDRESS);
        } else {
          // already logged in
          const { address } = ethers.Wallet.fromPhrase(walletData.seed);
          console.log(address);
          setUser({ ...data.user, address });
          navigate(PATH.GAME);
        }
      } catch (error) {
        // first login on other device
        const seed = generateMnemonic(128);
        await api(LOCAL_URL).post('/store-seed', {
          data: { seed, confirm: false },
          ...signIn,
        });
        setMnemonic(seed.split(' '));
        navigate(PATH.ADDRESS);
      }
    } catch (error) {
      logError(error);
    }
  };

  const handleSignUp = async (user: TSignUp) => {
    try {
      await api().post('/auth/signup', user);
      const { password, email } = user;
      const seed = generateMnemonic(128);
      await api(LOCAL_URL).post('/store-seed', {
        data: { seed, confirm: false },
        password,
        email,
      });
      navigate(PATH.SIGN_IN);
    } catch (error) {
      logError(error);
    }
  };

  const handleGetUser = async () => {
    try {
      const { data } = await api().get('/auth');
      const { data: walletData } = await api(LOCAL_URL).post('/get-seed', {
        email: data.user.email,
        password: password,
      });
      const { address } = ethers.Wallet.fromPhrase(walletData.seed);
      setUser({ ...data.user, address });
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
      await api(LOCAL_URL).put('/store-confirm', {
        email: user?.email,
        password,
      });
      if (user) {
        const wallet = ethers.Wallet.fromPhrase(seed);
        const address = wallet.address;
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

  const handleGetPrivateKey = async (email: string, password: string) => {
    const { data } = await api(LOCAL_URL).post('/get-private-key', {
      email,
      password,
    });
    return data.privateKey;
  };

  useEffect(() => {
    console.log('password', password);
  }, [password]);

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
        handleGetPrivateKey,
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
