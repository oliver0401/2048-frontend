import React, { useEffect, useMemo, useState } from 'react';
import Text from '../Text';
import { useMainContext } from '../../context/MainContext';
import { PATH } from '../../consts';
import { useNavigate } from 'react-router-dom';
import { useClipboard } from '../../hooks/useClipboard';
import { HiOutlineClipboardDocument, HiOutlineClipboardDocumentCheck } from 'react-icons/hi2';

const Navbar: React.FC = () => {
  const { user, handleSignOut } = useMainContext();
  useEffect(() => {
    console.log(user);
  }, [user]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const { onClick, content } = useClipboard(
    user?.address || '',
    <HiOutlineClipboardDocument className='text-primary dark:text-primary-dark' />,
    <HiOutlineClipboardDocumentCheck className='text-primary dark:text-primary-dark' />,
  );
  const menuItems = useMemo(
    () => [
      {
        label: 'Profile',
        onClick: () => navigate(PATH.PROFILE),
      },
      {
        label: 'Shop',
        onClick: () => navigate(PATH.SHOP),
      },
      {
        label: 'Sign out',
        onClick: handleSignOut,
      },
    ],
    [navigate, handleSignOut],
  );
  return (
    <div className="relative z-30 w-full flex justify-between items-center px-5 pt-4 pb-2 border-b-2 border-primary dark:border-primary-dark">
      <div className="flex items-center gap-2 relative">
        <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          <Text
            as="h1"
            color="primary"
            fontSize={16}
            className="font-bold capitalize hover:opacity-80 transition-opacity"
          >
            {user?.username}
          </Text>
        </div>
        <div
          className={`absolute top-full left-0 mt-2 w-36 rounded-md shadow-sm shadow-primary/50 dark:shadow-primary-dark/50 backdrop-blur-md transition-all duration-200 ease-in-out transform origin-top-left
          ${
            isOpen
              ? 'scale-100 opacity-100'
              : 'scale-95 opacity-0 pointer-events-none'
          }`}
        >
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`text-sm cursor-pointer w-full font-bold capitalize bg-background dark:bg-background-dark hover:bg-gray-200 hover:dark:bg-gray-800 text-primary dark:text-primary-dark transition-all duration-200 px-4 py-1 ${
                index === 0 ? 'rounded-t-md' : ''
              } ${
                index === menuItems.length - 1
                  ? 'rounded-b-md'
                  : 'border-b border-primary/50 dark:border-primary-dark/50'
              }`}
              onClick={item.onClick}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 relative group">
        <div 
          className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={onClick}
        >
          <Text
            as="span"
            color="primary"
            fontSize={16}
            className="font-bold"
          >
            Address:
          </Text>
          <Text
            as="span"
            color="primary"
            fontSize={16}
            className="font-mono"
          >
            {user?.address?.slice(0, 7)}...{user?.address?.slice(-5)}
          </Text>
          {content}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
