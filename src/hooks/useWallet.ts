import { ChangeEvent, useEffect, useState } from 'react';
import { useRandom } from './useRandom';
import { useMainContext } from '../context/MainContext';

export const useWallet = () => {
  const { mnemonic } = useMainContext();
  const [confirmWords, setConfirmWords] = useState<Record<number, string>>({});
  const { random } = useRandom();
  useEffect(() => {
    if (random.length > 0) {
      setConfirmWords(
        random.reduce(
          (acc, index) => ({
            ...acc,
            [index]: '',
          }),
          {},
        ),
      );
    }
  }, [random]);
  const [compare, setCompare] = useState<boolean>(false);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmWords({ ...confirmWords, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    let flag = true;
    for (const index of random) {
      if (confirmWords[`${index}`] !== mnemonic[index]) {
        flag = false;
        break;
      }
    }
    setCompare(flag);
  }, [confirmWords]);
  return { compare, onChange, random };
};
