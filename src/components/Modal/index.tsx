import React from 'react';
import './Modal.css'; // Importing a CSS file for animations
import Text from '../Text';
import { IoMdClose } from 'react-icons/io';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <div
      className={`fixed z-40 h-screen w-screen top-0 left-0 inset-0 flex items-center justify-center backdrop-blur-md transition-opacity duration-300 ease-in-out ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    >
      <div
        className="bg-background/80 max-w-[calc(100vw-40px)] min-w-96 min-h-40 dark:bg-background-dark/80 p-4 rounded shadow-sm dark:shadow-white/30 transform transition-transform duration-300 ease-in-out scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex justify-between items-center">
          <Text
            as="h2"
            color="primary"
            fontSize={20}
            className="text-lg font-bold"
          >
            {title}
          </Text>
          <IoMdClose
            size={28}
            className="text-primary dark:text-primary-dark hover:bg-primary/20 dark:hover:bg-primary-dark/20 transition-all rounded-full p-1"
            onClick={onClose}
          />
        </div>
        <div className="mt-4 w-full">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
