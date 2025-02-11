import { useState } from 'react';

export const usePkModal = () => {
  const [password, setPassword] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [error, setError] = useState('');
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  return {
    password,
    setPassword,
    handlePasswordChange,
    privateKey,
    setPrivateKey,
    error,
    setError,
  };
};
