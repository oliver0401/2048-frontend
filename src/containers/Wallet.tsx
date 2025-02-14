import React from 'react';
import { useMainContext } from '../context/MainContext';
import Text from '../components/Text';
import Input from '../components/Input';
import Button from '../components/Button';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../consts';
import { useWallet } from '../hooks/useWallet';

export const WalletContainer: React.FC = () => {
  const { mnemonic, handleConfirmStoreSeed } = useMainContext();
  const { random, compare, onChange } = useWallet();
  const navigate = useNavigate();

  return (
    <div className="w-full h-full mx-auto flex flex-col gap-6 items-center justify-center rounded-xl p-6">
      <div className="flex justify-start w-full">
        <FaArrowLeft
          size={32}
          onClick={() => navigate(PATH.ADDRESS)}
          className="border-2 border-primary/60 dark:border-primary-dark/60 text-primary/60 dark:text-primary-dark/60 hover:border-primary hover:dark:border-primary-dark hover:text-primary hover:dark:text-primary-dark transition-all rounded-full p-1"
        />
      </div>
      <Text
        as="h1"
        color="primary"
        fontSize={28}
        className="text-2xl font-bold tracking-wide"
      >
        Seed Phrase Recovery
      </Text>
      <Text
        color="primary"
        fontSize={14}
        className="text-center border-2 border-secondary dark:border-secondary-dark rounded-lg p-2 w-full backdrop-blur-md bg-gray-800/20 dark:bg-gray-600/20 shadow-inner"
      >
        Confirm Secret Recovery Phrase
      </Text>
      <div className="grid grid-cols-3 gap-4 w-full">
        {mnemonic.map((word, index) =>
          random.includes(index) ? (
            <Input
              key={index}
              color="primary"
              name={`${index}`}
              onChange={onChange}
              className="p-3 text-center border-2 border-primary dark:border-primary-dark rounded-lg bg-gray-200/30 dark:bg-gray-800/30 hover:bg-gray-700/30 transition-colors shadow-sm"
            />
          ) : (
            <Text
              color="primary"
              key={index}
              className="p-3 text-center border-2 border-primary dark:border-primary-dark rounded-lg bg-gray-200/30 dark:bg-gray-800/30 hover:bg-gray-700/30 transition-colors shadow-sm"
            >
              {word}
            </Text>
          ),
        )}
      </div>
      <Button
        onClick={() => handleConfirmStoreSeed(mnemonic.join(' '))}
        disabled={!compare}
        className="w-full"
        color="primary"
      >
        Confirm
      </Button>
    </div>
  );
};
