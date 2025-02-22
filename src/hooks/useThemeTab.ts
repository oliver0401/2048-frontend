import { useEffect } from "react";
import { useMainContext } from "../context";

export const useThemeTab = () => {
  const { themes, handleGetThemes, handleBuyTheme } = useMainContext();

  useEffect(() => {
    handleGetThemes();
  }, []);

  return { themes, handleBuyTheme };
};
