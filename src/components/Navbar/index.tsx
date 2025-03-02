import React, { useMemo } from 'react';
import Text from '../Text';
import { useMainContext } from '../../context/MainContext';
import { PATH } from '../../consts';
import { useNavigate } from 'react-router-dom';
import { useClipboard } from '../../hooks/useClipboard';
import {
  HiOutlineClipboardDocument,
  HiOutlineClipboardDocumentCheck,
} from 'react-icons/hi2';
import {
  IoColorPaletteOutline,
  IoDocumentTextOutline,
  IoStatsChart,
  IoWallet,
} from 'react-icons/io5';
import { BsShop } from 'react-icons/bs';
import { VscSignOut } from 'react-icons/vsc';
import { useToggle } from '../../hooks/useToggle';
import { ThemeSelectModal } from './ThemeSelectModal';
import { useWeb3Context } from '../../context';

const Navbar: React.FC = () => {
  const { user, handleSignOut } = useMainContext();
  const { open, onOpen, onClose } = useToggle(false);
  const {
    open: themeOpen,
    onOpen: onThemeOpen,
    onClose: onThemeClose,
  } = useToggle(false);
  const navigate = useNavigate();
  const { userBalance } = useWeb3Context();
  const { onClick, content } = useClipboard(
    user?.address || '',
    <HiOutlineClipboardDocument className="text-primary dark:text-primary-dark" />,
    <HiOutlineClipboardDocumentCheck className="text-primary dark:text-primary-dark" />,
  );
  const menuItems = useMemo(
    () => [
      {
        label: 'Profile',
        onClick: () => navigate(PATH.PROFILE),
        icon: IoDocumentTextOutline,
      },
      {
        label: 'Wallet',
        onClick: () => navigate(PATH.WALLET),
        icon: IoWallet,
      },
      {
        label: 'Shop',
        onClick: () => navigate(PATH.SHOP),
        icon: BsShop,
      },
      {
        label: 'Theme',
        onClick: () => {
          onClose();
          onThemeOpen();
        },
        icon: IoColorPaletteOutline,
      },
      {
        label: 'Leaderboard',
        onClick: () => navigate(PATH.LEADERBOARD),
        icon: IoStatsChart,
      },
      {
        label: 'Sign out',
        onClick: handleSignOut,
        icon: VscSignOut,
      },
    ],
    [navigate, handleSignOut],
  );
  return (
    <div className="relative z-30 w-full flex justify-between items-center px-5 pt-4 pb-2 border-b-2 border-primary dark:border-primary-dark">
      <div className="flex items-center gap-2 relative">
        <div className="" onClick={onOpen}>
          <Text
            as="h1"
            color="primary"
            fontSize={16}
            className="font-bold capitalize transition-all"
          >
            {user?.username}
          </Text>
        </div>
        <div
          className={`absolute w-screen h-screen -top-4 -left-5 bg-transparent ${
            open ? '' : 'pointer-events-none'
          }`}
          onClick={onClose}
        />
        <div
          className={`absolute top-full h-[calc(100vh-46px)] mt-[10px] pt-4 w-48 shadow-sm shadow-primary/50 dark:shadow-primary-dark/50 bg-gradient-to-b from-gray-200/95 to-gray-200/50 dark:from-gray-800/95 dark:to-gray-800/50 transition-all duration-200 ease-in-out transform origin-top-left
          ${open ? ' -left-5' : '-left-[212px] pointer-events-none'}`}
        >
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 text-md w-full font-bold capitalize hover:bg-gray-800/60 hover:dark:bg-gray-200/80 hover:text-white text-primary dark:text-primary-dark transition-all duration-200 px-4 py-1`}
              onClick={item.onClick}
            >
              <item.icon size={20} />
              {item.label}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 relative group">
        <div
          className="flex items-center gap-1 hover:opacity-80 transition-opacity"
          onClick={onClick}
        >
          <Text as="span" color="primary" fontSize={16} className="font-bold">
            Address:
          </Text>
          <Text as="span" color="primary" fontSize={16} className="font-mono">
            {user?.address?.slice(0, 7)}...{user?.address?.slice(-5)}
          </Text>
          {content}
        </div>
        <Text as="span" color="primary" fontSize={16} className="font-bold">
          {userBalance?.toString()} DWAT
        </Text>
      </div>
      <ThemeSelectModal isOpen={themeOpen} onClose={onThemeClose} />
    </div>
  );
};

export default Navbar;
