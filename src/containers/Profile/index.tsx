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
import { TbSeeding } from "react-icons/tb";
import { useToggle } from '../../hooks/useToggle';
import { PrivateKeyModal } from './PrivateKeyModal';
import { ImportWalletModal } from './ImportWalletModal';
import { RenderField } from './RenderField';
import { ShowSeedModal } from './ShowSeedModal';
export const ProfileContainer: React.FC = () => {
  const { user } = useMainContext();
  const navigate = useNavigate();
  const { onClick, content } = useClipboard(
    user?.address || '',
    <HiOutlineClipboardDocument size={20} />,
    <HiOutlineClipboardDocumentCheck size={20} />,
  );

  const { open, onClose, onOpen } = useToggle(false);
  const {
    open: openImportWallet,
    onClose: onCloseImportWallet,
    onOpen: onOpenImportWallet,
  } = useToggle(false);
  const {
    open: openSeedPhrase,
    onClose: onCloseSeedPhrase,
    onOpen: onOpenSeedPhrase,
  } = useToggle(false);

  return (
    <div className="w-full h-full flex flex-col gap-6 justify-start items-start p-10">
      {RenderField({ label: 'Username', value: user?.username })}
      {RenderField({
        label: 'Address',
        value: (
          <>
            <Text as="span" color="primary" fontSize={18} className="font-mono">
              {user?.address?.slice(0, 7)}...{user?.address?.slice(-5)}
            </Text>
            <div
              className="flex items-center justify-center"
              onClick={onClick}
            >
              {content}
            </div>
          </>
        ),
      })}
      {RenderField({
        label: 'Grid Size',
        value: `${user?.rows || '-1'} x ${user?.cols || '-1'}`,
      })}
      {RenderField({ label: 'Max Score', value: user?.maxScore })}
      {RenderField({ label: 'Max Tile', value: user?.maxTile })}
      {RenderField({ label: 'Min Moves', value: user?.minMoves || '-1' })}
      {RenderField({ label: 'Token Amount', value: 0 })}
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
        onClick={onOpenSeedPhrase}
        className="group w-full flex items-center justify-center gap-2"
      >
        <TbSeeding
          size={20}
          className="group-hover:-translate-x-1 transition-transform"
        />
        Show Seed Phrase
      </Button>
      <Button
        onClick={onOpenImportWallet}
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
      <PrivateKeyModal isOpen={open} onClose={onClose} />
      <ImportWalletModal
        isOpen={openImportWallet}
        onClose={onCloseImportWallet}
      />
      <ShowSeedModal
        isOpen={openSeedPhrase}
        onClose={onCloseSeedPhrase}
      />
    </div>
  );
};
