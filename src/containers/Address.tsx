// src/containers/Address.tsx
import React from 'react';
import { Buffer } from 'buffer'; // Add this line to import Buffer
import Text from '../components/Text';
import { LuClipboard, LuClipboardCheck } from 'react-icons/lu';
import { useClipboard } from '../hooks/useClipboard';
import { useToggle } from '../hooks/useToggle';
import Button from '../components/Button';
import { PiSpinner } from 'react-icons/pi';
import { PATH } from '../consts';
import { useNavigate } from 'react-router-dom';
import { useAddress } from '../hooks/useAddress';
// Polyfill for Buffer in the browser
(window as any).Buffer = Buffer; // Add this line to define Buffer

export const AddressContainer: React.FC = () => {
  const { mnemonic } = useAddress();
  const { onClick, content } = useClipboard(
    mnemonic.join(' '),
    <>
      <LuClipboard className="w-4 h-4 text-primary dark:text-primary-dark" />
      <Text color="primary">Copy to Clipboard</Text>
    </>,
    <>
      <LuClipboardCheck className="w-4 h-4 text-primary dark:text-primary-dark" />
      <Text color="primary">Clipboard Copied!</Text>
    </>,
  );
  const { open, onOpen } = useToggle(false);
  const navigate = useNavigate();

  return (
    <div className="w-full h-full mx-auto flex flex-col gap-6 items-center justify-center rounded-xl p-6">
      <Text
        as="h2"
        color="primary"
        fontSize={26}
        className="font-bold tracking-wide text-center"
      >
        Secret Recovery Phrase
      </Text>
      <Text
        color="primary"
        fontSize={14}
        className="text-center border-2 border-secondary dark:border-secondary-dark rounded-lg p-2 w-full backdrop-blur-md bg-gray-800/20 dark:bg-gray-600/20 shadow-inner"
      >
        Please save this phrase in a safe place.
        <br /> And then click the button below to create your wallet.
      </Text>
      {mnemonic.length > 0 ? (
        <div className="grid grid-cols-3 gap-4 w-full">
          {mnemonic.map((word, index) => (
            <Text
              color="primary"
              key={index}
              className="p-3 text-center border-2 border-primary dark:border-primary-dark rounded-lg bg-gray-200/30 dark:bg-gray-800/30 hover:bg-gray-700/30 transition-colors shadow-sm"
            >
              {word}
            </Text>
          ))}
        </div>
      ) : (
        <div className="w-[312px] h-60 flex items-center justify-center gap-2">
          <PiSpinner className="w-6 h-6 text-primary dark:text-primary-dark animate-spin" />
          <Text color="primary">Generating Seed Phrase...</Text>
        </div>
      )}
      <div
        className="w-full flex items-center justify-end gap-2"
        onClick={() => {
          onClick();
          onOpen();
        }}
      >
        {content}
      </div>
      <Button
        color="tile64"
        onClick={() => {
          navigate(PATH.WALLET);
        }}
        disabled={!open}
        className="w-full"
      >
        Create Wallet
      </Button>
    </div>
  );
};
