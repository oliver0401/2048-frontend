import React from 'react';
import Text from '../../components/Text';
import { useMainContext } from '../../context/MainContext';
import {
  HiOutlineClipboardDocument,
  HiOutlineClipboardDocumentCheck,
} from 'react-icons/hi2';
import { useClipboard } from '../../hooks/useClipboard';
import Button from '../../components/Button';
import { PATH } from '../../consts';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack, IoKey, IoWallet } from 'react-icons/io5';
import { useToggle } from '../../hooks/useToggle';
import PrivateKeyModal from './PrivateKeyModal';

export const ProfileContainer: React.FC = () => {
  const { user } = useMainContext();
  const navigate = useNavigate();
  const { onClick, content } = useClipboard(
    user?.address || '',
    <HiOutlineClipboardDocument size={20} />,
    <HiOutlineClipboardDocumentCheck size={20} />,
  );

  const { open, onClose, onOpen } = useToggle(false);

  const textProps = {
    color: 'primary' as const,
    fontSize: 18,
    className: 'capitalize',
  };

  const renderField = (label: string, value: React.ReactNode) => (
    <div className="flex items-center gap-2">
      <Text as="h1" {...textProps}>
        {label}:
      </Text>
      <Text
        as="div"
        {...textProps}
        className={`${textProps.className} flex items-center gap-2`}
      >
        {value}
      </Text>
    </div>
  );

  const addressDisplay = (
    <>
      <Text as="span" {...textProps} className="font-mono">
        {user?.address?.slice(0, 7)}...{user?.address?.slice(-5)}
      </Text>
      <div
        className="cursor-pointer flex items-center justify-center"
        onClick={onClick}
      >
        {content}
      </div>
    </>
  );

  return (
    <div className="w-full h-full flex flex-col gap-6 justify-start items-start p-10">
      {renderField('Username', user?.username)}
      {renderField('Address', addressDisplay)}
      {renderField(
        'Grid Size',
        `${user?.rows || '-1'} x ${user?.cols || '-1'}`,
      )}
      {renderField('Max Score', user?.maxScore)}
      {renderField('Max Tile', user?.maxTile)}
      {renderField('Min Moves', user?.minMoves || '-1')}
      {renderField('Token Amount', 0)}
      <Button
        onClick={onOpen}
        className="w-full flex items-center justify-center gap-2 group"
      >
        <IoKey
          size={20}
          className="group-hover:-translate-x-1 transition-transform"
        />
        Show Private Key
      </Button>
      <Button
        onClick={onOpen}
        className="w-full flex items-center justify-center gap-2 group"
      >
        <IoWallet
          size={20}
          className="group-hover:-translate-x-1 transition-transform"
        />
        Import New Wallet
      </Button>
      <Button
        onClick={() => navigate(PATH.GAME)}
        className="group w-full flex items-center justify-center gap-2"
      >
        <IoArrowBack
          size={20}
          className="group-hover:-translate-x-1 transition-transform"
        />
        Return to Game
      </Button>
      <PrivateKeyModal
        isOpen={open}
        onClose={onClose}
      />
    </div>
  );
};
