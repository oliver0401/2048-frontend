import { useState } from 'react';

export const useSeedPhrase = () => {
  const [seedPhrase, setSeedPhrase] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  return {
    seedPhrase,
    setSeedPhrase,
    error,
    setError,
    password,
    setPassword,
    handlePasswordChange,
  };
};
