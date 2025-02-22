import { useCallback, useEffect, useState } from 'react';
import { ThemeName } from '../themes/types';

export default function useTheme(initialTheme: ThemeName = ThemeName.DEFAULT) {
  const [theme, setTheme] = useState({ name: initialTheme });

  const updateTheme = useCallback((name: ThemeName) => {
    if (name === ThemeName.DARK) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    setTheme({ name });
  }, []);

  useEffect(() => {
    updateTheme(initialTheme);
  }, [initialTheme, updateTheme]);

  return [theme, updateTheme] as const;
}
