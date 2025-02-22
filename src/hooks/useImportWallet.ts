import { useState } from 'react';

export const useImportWallet = () => {
  const [password, setPassword] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [error, setError] = useState('');
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const [seedPhrase, setSeedPhrase] = useState<string[]>(
    Array.from({ length: 12 }, () => ''),
  );
  const handleSeedPhraseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeedPhrase(
      seedPhrase.map((phrase, index) =>
        index === parseInt(e.target.name) ? e.target.value : phrase,
      ),
    );
  };
  const resetSeedPhrase = () => {
    setSeedPhrase(Array.from({ length: 12 }, () => ''));
  };
  return {
    password,
    setPassword,
    privateKey,
    setPrivateKey,
    error,
    setError,
    handlePasswordChange,
    seedPhrase,
    resetSeedPhrase,
    handleSeedPhraseChange,
  };
};
