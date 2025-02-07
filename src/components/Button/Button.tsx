import React from 'react';

export interface ButtonProps {
  onClick: () => void;
  disable?: boolean;
  mini?: boolean;
  width?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  disable = false,
  mini = false,
  width,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disable}
      className={`
        ${mini ? 'w-6 h-6 text-xs' : 'px-4 py-2 text-base'}
        ${width || ''}
        outline-none border-none
        rounded
        ${disable ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        bg-primary dark:bg-primary-dark 
        text-foreground dark:text-foreground-dark
        transition-colors duration-300
        hover:bg-secondary dark:hover:bg-secondary-dark
        disabled:hover:bg-primary dark:disabled:hover:bg-primary-dark
      `}
    >
      {children}
    </button>
  );
};

export default Button;
