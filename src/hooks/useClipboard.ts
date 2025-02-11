import { useState } from "react";

export const useClipboard = (
  clipboardText: string,
  originalContent: React.ReactNode,
  changeContent: React.ReactNode,
) => {
  const [content, setContent] = useState(originalContent);
  const [isCopied, setIsCopied] = useState(false);
  const onClick = () => {
    navigator.clipboard.writeText(clipboardText)
      .then(() => {
        setIsCopied(true);
        setContent(changeContent);
        setTimeout(() => {
          setContent(originalContent);
          setIsCopied(false);
        }, 3000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };
  return { onClick, content, isCopied };
};
