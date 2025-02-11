import { useState } from "react";

export const useImportWallet = () => {
  const [password, setPassword] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [error, setError] = useState('');
  
};

