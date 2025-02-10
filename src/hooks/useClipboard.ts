import { useState } from "react";

export const useClipboard = (
  clipboardText: string,
  originalContent: React.ReactNode,
  changeContent: React.ReactNode,
) => {
  navigator.clipboard.writeText(clipboardText);
  const [content, setContent] = useState(originalContent);
  const onClick = () => {
    setContent(changeContent);
    setTimeout(() => {
      setContent(originalContent);
    }, 3000);
  };
  return { onClick, content };
};
