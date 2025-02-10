import { useState } from 'react';

export const useToggle = (value: boolean) => {
  const [open, setOpen] = useState<boolean>(value);
  const toggle = () => {
    setOpen(!open);
  };

  const onClose = () => {
    setOpen(false);
  };
  const onOpen = () => {
    setOpen(true);
  };
  return { open, toggle, onClose, onOpen };
};
