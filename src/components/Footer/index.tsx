import React from 'react';
import Text from '../Text';
import { useMainContext } from '../../context/MainContext';
import { IoArrowUndo, IoHammerSharp } from 'react-icons/io5';
import { FaBolt } from 'react-icons/fa';
const Footer: React.FC = () => {
  const { user } = useMainContext();
  console.log('user', user);
  return (
    <div className="w-full grid grid-cols-3 py-2 border-t-2 border-primary dark:border-primary-dark px-2">
      <div className="w-full flex items-center justify-center gap-2">
        <Text as="h1" color="primary" fontSize={16} className="font-bold">
          <IoHammerSharp />
        </Text>
        <Text as="h1" color="primary" fontSize={16} className="font-bold">
          0
        </Text>
      </div>
      <div className="w-full flex items-center justify-center gap-2">
        <Text as="h1" color="primary" fontSize={16} className="font-bold">
          <IoArrowUndo />
        </Text>
        <Text as="h1" color="primary" fontSize={16} className="font-bold">
          0
        </Text>
      </div>
      <div className="w-full flex items-center justify-center gap-2">
        <Text as="h1" color="primary" fontSize={16} className="font-bold">
          <FaBolt />
        </Text>
        <Text as="h1" color="primary" fontSize={16} className="font-bold">
          0
        </Text>
      </div>
    </div>
  );
};

export default Footer;
