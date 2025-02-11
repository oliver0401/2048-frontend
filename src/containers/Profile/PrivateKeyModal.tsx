import React from 'react';
import Modal from '../../components/Modal';
import Text from '../../components/Text';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { usePkModal } from '../../hooks/usePkModal';
import { useMainContext } from '../../context/MainContext';
import { useClipboard } from '../../hooks/useClipboard';
import { HiOutlineClipboardDocumentCheck } from 'react-icons/hi2';
import { HiOutlineClipboardDocument } from 'react-icons/hi2';

interface PrivateKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivateKeyModal: React.FC<PrivateKeyModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    password,
    setPassword,
    handlePasswordChange,
    privateKey,
    setPrivateKey,
    error,
    setError,
  } = usePkModal();
  const onPkModalClose = () => {
    onClose();
    setPrivateKey('');
    setError('');
    setPassword('');
  };
  const handleConfirm = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    try {
      e.preventDefault();
      if (privateKey) {
        onPkModalClose();
        return;
      }
      if (password === '') {
        setError('Password is required');
        return;
      }
      if (user?.email) {
        const pk = await handleGetPrivateKey(user.email || '', password);
        setPrivateKey(pk);
      }
    } catch (err: any) {
      setError(err.response.data.error);
    }
  };
  const { user, handleGetPrivateKey } = useMainContext();
  const { onClick: onClickPrivateKey, content: contentPrivateKey } =
    useClipboard(
      privateKey,
      <HiOutlineClipboardDocument size={20} />,
      <HiOutlineClipboardDocumentCheck size={20} />,
    );
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Show Private Key">
      <form className="flex flex-col gap-2 w-full">
        <Text as="p" color="primary" fontSize={16}>
          Enter your password to show your private key
        </Text>
        {privateKey ? (
          <div
            onClick={onClickPrivateKey}
            className="flex flex-col cursor-pointer items-center p-2 border border-primary dark:border-primary-dark rounded-md w-full text-center text-primary dark:text-primary-dark font-mono break-all"
          >
            {privateKey}
            {/* Assuming contentPrivateKey is a JSX element */}
            {contentPrivateKey}
          </div>
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
          {privateKey ? 'Close' : 'Confirm'}
        </Button>
      </form>
    </Modal>
  );
};

export default PrivateKeyModal;
