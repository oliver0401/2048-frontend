import React from 'react';
import Modal from '../../components/Modal';
import Text from '../../components/Text';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useMainContext } from '../../context/MainContext';
import { useClipboard } from '../../hooks/useClipboard';
import { HiOutlineClipboardDocumentCheck } from 'react-icons/hi2';
import { HiOutlineClipboardDocument } from 'react-icons/hi2';
import { useSeedPhrase } from '../../hooks/useSeedPhrase';

interface ShowSeedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShowSeedModal: React.FC<ShowSeedModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    password,
    setPassword,
    handlePasswordChange,
    error,
    setError,
    seedPhrase,
    setSeedPhrase,
  } = useSeedPhrase();
  const onShowSeedModalClose = () => {
    setSeedPhrase('');
    setError('');
    setPassword('');
    onClose();
  };
  const { user, handleGetSeed } = useMainContext();
  const handleConfirm = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    try {
      e.preventDefault();
      if (seedPhrase) {
        onShowSeedModalClose();
        return;
      }
      if (password === '') {
        setError('Password is required');
        return;
      }
      if (user?.email) {
        const data = await handleGetSeed(user.email || '', password);
        setSeedPhrase(data.seed);
      }
    } catch (err: any) {
      setError(err.response.data.error);
    }
  };
  const { onClick: onClickSeedPhrase, content: contentSeedPhrase } =
    useClipboard(
      seedPhrase,
      <HiOutlineClipboardDocument size={20} />,
      <HiOutlineClipboardDocumentCheck size={20} />,
    );
  return (
    <Modal
      isOpen={isOpen}
      onClose={onShowSeedModalClose}
      title="Show Seed Phrase"
    >
      <form className="flex flex-col gap-2 w-full">
        <Text as="p" color="primary" fontSize={16}>
          Enter your password to show your seed phrase
        </Text>
        {seedPhrase ? (
          <>
            <div
              // onClick={onClickSeedPhrase}
              className="grid grid-cols-3 gap-2"
            >
              {seedPhrase.split(' ').map((word, index) => (
                <div
                  key={index}
                  className="text-primary dark:text-primary-dark p-1 border border-primary dark:border-primary-dark rounded-md text-center"
                >
                  {word}
                </div>
              ))}
            </div>
            <div
              className="w-full flex items-center justify-end text-primary dark:text-primary-dark text-sm"
              onClick={onClickSeedPhrase}
            >
              Copy Seed Phrase {contentSeedPhrase}
            </div>
          </>
        ) : (
          <Input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            error={error}
          />
        )}
        <Button
          type="submit"
          onClick={handleConfirm}
          className="w-full flex items-center justify-center gap-2"
        >
          {seedPhrase ? 'Close' : 'Confirm'}
        </Button>
      </form>
    </Modal>
  );
};
