import { useCallback, useState } from 'react';

const useLocalStorage = <T>(
  name: string,
  initialValue: T,
): [T, (newValue: T) => void] => {
  const getValue = (): T => {
    try {
      const item = window.localStorage.getItem(name);
      try {
        return item != null ? JSON.parse(item) : initialValue;
      } catch {
        return item != null ? (item as T) : initialValue;
      }
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error(
        `Cannot get localStorage by the given name ${name}:`,
        error.message,
      );
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(getValue);

  const setValue = useCallback(
    (newValue: T) => {
      try {
        window.localStorage.setItem(
          name,
          typeof newValue === 'string' ? newValue : JSON.stringify(newValue),
        );
        setStoredValue(newValue);
      } catch (error: any) {
        // eslint-disable-next-line no-console
        console.error(
          `Cannot set localStorage by the given name ${name}:`,
          error.message,
        );
      }
    },
    [name],
  );

  return [storedValue, setValue];
};

export default useLocalStorage;
