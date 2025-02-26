import React from 'react';
import { TOption } from '../../types';
import { useToggle } from '../../hooks/useToggle';
import './dropdown.css';

interface DropDownProps {
  options: TOption[];
  selectedOption: string;
  onSelect: (option: TOption) => void;
}

export const DropDown: React.FC<DropDownProps> = ({
  options,
  selectedOption,
  onSelect,
}) => {
  const { open, onToggle, onClose } = useToggle(false);
  return (
    <div className="relative min-w-48 text-lg border border-primary dark:border-primary-dark rounded-md px-4 py-2 focus:outline-none focus:ring-0 focus:ring-offset-0">
      <div
        className="text-primary dark:text-primary-dark text-lg"
        onClick={onToggle}
      >
        {options.find((option) => option.value === selectedOption)?.label}
      </div>

      {open && (
        <div
          className="fixed w-screen h-screen top-0 left-0 z-10"
          onClick={onClose}
        />
      )}
      <div
        className={`flex flex-col absolute top-9 left-0 w-full dark:bg-gray-800 bg-background rounded-md py-1 z-20 dropdown-fade-in border border-none ${
          open ? 'opacity-100' : 'opacity-0 -translate-y-5 pointer-events-none'
        } transition-all`}
        onClick={(e) => e.stopPropagation()}
      >
        {options.map((option) => (
          <div
            key={option.value}
            className="hover:bg-primary/10 dark:hover:bg-primary-dark/10 px-4 py-2"
            onClick={() => {
              onSelect(option);
              onClose();
            }}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};
