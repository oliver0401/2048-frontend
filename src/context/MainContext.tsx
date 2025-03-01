import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import {
  TPowerupStatus,
  THandleStoreSeed,
  TSeed,
  TSignIn,
  TSignUp,
  TTheme,
  TTileImg,
  TUser,
} from '../types';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { MOUSE, PATH } from '../consts';
import useLocalStorage from '../hooks/useLocalStorage';
import { LOCAL_URL } from '../consts/config';
import { generateMnemonic } from 'bip39';
import { ethers } from 'ethers';
import { useToggle } from '../hooks/useToggle';
import { toast } from 'react-toastify';

export enum ThemeImage {
  'I2' = 2,
  'I4' = 4,
  'I8' = 8,
  'I16' = 16,
  'I32' = 32,
  'I64' = 64,
  'I128' = 128,
  'I256' = 256,
  'I512' = 512,
  'I1024' = 1024,
  'I2048' = 2048,
  'I4096' = 4096,
  'I8192' = 8192,
}
interface MainContextType {
  user: TUser | null;
  setUser: (user: TUser | null) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  handleSignIn: (user: TSignIn) => Promise<void>;
  handleSignUp: (user: TSignUp) => Promise<void>;
  token: string;
  setToken: (token: string) => void;
  privateKey: string;
  setPrivateKey: (privateKey: string) => void;
  handleGetUser: () => Promise<void>;
  mnemonic: string[];
  setMnemonic: (mnemonic: string[]) => void;
  handleConfirmStoreSeed: (seed: string) => Promise<void>;
  handleSignOut: () => void;
  handleGetPrivateKey: (email: string, password: string) => Promise<string>;
  handleRequestRewarding: (address: string, amount: number) => Promise<object>;
  handleStoreSeed: (data: THandleStoreSeed) => Promise<void>;
  handleGetSeed: (email: string, password: string) => Promise<TSeed>;
  cursor: string;
  setCursor: (cursor: string) => void;
  themes: TTheme[];
  setThemes: (themes: TTheme[]) => void;
  handleGetThemes: () => Promise<void>;
  handleBuyTheme: (themeId: string) => Promise<void>;
  theme: string;
  setTheme: (theme: string) => void;
  themeImages: Record<ThemeImage, TTileImg | undefined>;
  setThemeImages: (
    themeImages: Record<ThemeImage, TTileImg | undefined>,
  ) => void;
  powerupOpen: boolean;
  onPowerupClose: () => void;
  onPowerupOpen: () => void;
  powerupStatus: TPowerupStatus;
  setPowerupStatus: (powerupStatus: TPowerupStatus) => void;
  handleUpdateUser: (updateData: Partial<TUser>) => Promise<void>;
  handleGetMaxTile: () => Promise<any>;
  handleGetMaxMove: () => Promise<any>;
  handleGetMaxScore: () => Promise<any>;
  itemUsed: Record<string, boolean>;
  setItemUsed: (itemUsed: Record<string, boolean>) => void;
}

const MainContext = createContext<MainContextType | undefined>(undefined);

// Add a utility function for error logging
const logError = (error: any) => {
  toast.error(error.response.data.message);
};

export const MainProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<TUser | null>(null);
  const [privateKey, setPrivateKey] = useLocalStorage<string>('pk', '');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useLocalStorage('token', '');
  const [mnemonic, setMnemonic] = useState<string[]>([]);
  const [password, setPassword] = useLocalStorage('password', '');
  const [cursor, setCursor] = useState<string>(MOUSE.Default);
  const [theme, setTheme] = useState<string>('default');
  const [themeImages, setThemeImages] = useState<
    Record<ThemeImage, TTileImg | undefined>
  >({
    2: undefined,
    4: undefined,
    8: undefined,
    16: undefined,
    32: undefined,
    64: undefined,
    128: undefined,
    256: undefined,
    512: undefined,
    1024: undefined,
    2048: undefined,
    4096: undefined,
    8192: undefined,
  });

  const [itemUsed, setItemUsed] = useState<Record<string, boolean>>({
    powerup: false,
    upgrade: false,
  });

  const handleStoreSeed = async ({
    seed,
    confirm,
    email,
    password,
  }: THandleStoreSeed) => {
    await api(LOCAL_URL).post('/store-seed', {
      data: { seed, confirm },
      password,
      email,
    });
  };

  const handleGetSeed = async (
    email: string,
    password: string,
  ): Promise<TSeed> => {
    const { data } = await api(LOCAL_URL).post('/get-seed', {
      email,
      password,
    });
    return data;
  };

  const handleSignIn = async (signIn: TSignIn) => {
    try {
      const { data } = await api().post('/auth/signin', signIn);
      const pk = await handleGetPrivateKey(signIn.email, signIn.password);
      setPrivateKey(pk);
      console.log(pk);
      setPassword(signIn.password);
      setToken(data.token);
      setIsAuthenticated(true);
      setUser(data.user);
      try {
        const walletData = await handleGetSeed(signIn.email, signIn.password);
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
        await handleStoreSeed({ seed, confirm: false, ...signIn });
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
      await handleStoreSeed({ seed, confirm: false, password, email });
      navigate(PATH.SIGN_IN);
    } catch (error) {
      logError(error);
    }
  };

  const handleGetUser = async () => {
    try {
      const { data } = await api().get('/auth');
      const walletData = await handleGetSeed(data.email, password);
      const { address } = ethers.Wallet.fromPhrase(walletData.seed);
      setUser({ ...data, address });
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

  const getThemes = async () => {
    const { data } = await api().get('/themes');
    return data;
  };
  const buyTheme = async (themeId: string) => {
    const { data } = await api().post(`/themes/buy`, { themeId });
    return data;
  };

  const [themes, setThemes] = useState<TTheme[]>([]);

  const handleGetThemes = async () => {
    try {
      const themes = await getThemes();
      setThemes(themes);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBuyTheme = async (themeId: string) => {
    try {
      await buyTheme(themeId);
      setThemes(
        themes.map((theme) =>
          theme.uuid === themeId ? { ...theme, owned: true } : theme,
        ),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const {
    open: powerupOpen,
    onClose: onPowerupClose,
    onOpen: onPowerupOpen,
  } = useToggle(false);
  const [powerupStatus, setPowerupStatus] = useState<TPowerupStatus>({
    enabled: false,
    currentStart: 0,
  });

  const handleUpdateUser = async (updateData: Partial<TUser>) => {
    try {
      const { data } = await api().put('/auth', updateData);
      if (user) {
        setUser({ ...user, ...data });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetMaxTile = async () => {
    const { data } = await api().get('/calc/max-tile');
    return data;
  };

  const handleGetMaxMove = async () => {
    const { data } = await api().get('/calc/max-moves');
    return data;
  };

  const handleGetMaxScore = async () => {
    const { data } = await api().get('/calc/max-score');
    return data;
  };

  const handleRequestRewarding = async (address: String, amount: Number) => {
    const res = await api().post('./reward/send', {
      address,
      amount,
    });
    return res;
  };

  useEffect(() => {
    if (user) {
      handleGetThemes();
    }
  }, [user]);
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
        privateKey,
        setPrivateKey,
        handleGetUser,
        mnemonic,
        setMnemonic,
        handleConfirmStoreSeed,
        handleSignOut,
        handleGetPrivateKey,
        handleRequestRewarding,
        handleStoreSeed,
        handleGetSeed,
        cursor,
        setCursor,
        themes,
        setThemes,
        handleGetThemes,
        handleBuyTheme,
        theme,
        setTheme,
        themeImages,
        setThemeImages,
        powerupOpen,
        onPowerupClose,
        onPowerupOpen,
        powerupStatus,
        setPowerupStatus,
        handleUpdateUser,
        handleGetMaxTile,
        handleGetMaxMove,
        handleGetMaxScore,
        itemUsed,
        setItemUsed,
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
