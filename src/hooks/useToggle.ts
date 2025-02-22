import { useState } from 'react';

export const useToggle = (value: boolean) => {
  const [open, setOpen] = useState<boolean>(value);
  const onToggle = () => {
    setOpen(!open);
  };

  const onClose = () => {
    setOpen(false);
  };
  const onOpen = () => {
    setOpen(true);
  };
  return { open, onToggle, onClose, onOpen };
};
