import React, { useEffect } from 'react';
import Modal from '../../components/Modal';
import Text from '../../components/Text';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useMainContext } from '../../context/MainContext';
import { useImportWallet } from '../../hooks/useImportWallet';
import { useToggle } from '../../hooks/useToggle';
import { validateMnemonic } from 'bip39';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ImportWalletModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { user, handleGetPrivateKey, handleStoreSeed, handleGetUser } =
    useMainContext();
  const {
    open: openSeedPhrase,
    onOpen: onOpenSeedPhrase,
    onClose: onCloseSeedPhrase,
  } = useToggle(false);
  const {
    password,
    setPassword,
    handlePasswordChange,
    error,
    setError,
    resetSeedPhrase,
    seedPhrase,
    handleSeedPhraseChange,
  } = useImportWallet();
  const onImportWalletModalClose = () => {
    resetSeedPhrase();
    setPassword('');
    setError('');
    onCloseSeedPhrase();
    onClose();
  };
  const handleConfirm = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (password === '') {
      setError('Password is required');
      return;
    }
    if (openSeedPhrase) {
      if (validateMnemonic(seedPhrase.join(' '))) {
        await handleStoreSeed({
          seed: seedPhrase.join(' '),
          confirm: true,
          email: user?.email || '',
          password,
        });
        onImportWalletModalClose();
        await handleGetUser();
        return;
      }
    }
    try {
      await handleGetPrivateKey(user?.email || '', password);
      onOpenSeedPhrase();
    } catch (err: any) {
      setError(err.response.data.error);
    }
  };
  useEffect(() => {
    console.log('onOpenSeedPhrase', openSeedPhrase);
  }, [openSeedPhrase]);
  return (
    <Modal isOpen={isOpen} onClose={onImportWalletModalClose} title="Import Wallet">
      <form className="flex flex-col gap-2 w-full">
        <Text as="p" color="primary" fontSize={16}>
          Import your wallet from seed phrase
        </Text>
        {openSeedPhrase ? (
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 12 }).map((_, index) => (
              <Input
                key={index}
                name={index.toString()}
                className="w-full text-center"
                value={seedPhrase[index]}
                onChange={handleSeedPhraseChange}
              />
            ))}
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
          disabled={
            openSeedPhrase
              ? !validateMnemonic(seedPhrase.join(' '))
              : password === ''
          }
          className="w-full flex items-center justify-center gap-2"
        >
          Confirm
        </Button>
      </form>
    </Modal>
  );
};
