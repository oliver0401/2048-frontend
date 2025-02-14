import React from 'react';
import { Color } from '../../themes/types';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disable?: boolean;
  mini?: boolean;
  width?: string;
  children: React.ReactNode;
  className?: string;
  color?: Color;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled = false,
  mini = false,
  width,
  children,
  className,
  color = 'primary',
  ...props
}) => {
  const colorClasses = {
    primary: 'bg-primary dark:bg-primary-dark',
    secondary: 'bg-secondary dark:bg-secondary-dark',
    tertiary: 'bg-tertiary dark:bg-tertiary-dark',
    background: 'bg-background dark:bg-background-dark',
    foreground: 'text-foreground dark:text-foreground-dark',
    backdrop: 'bg-backdrop dark:bg-backdrop',
    tile2: 'bg-tile-2 dark:bg-tile-2-dark',
    tile4: 'bg-tile-4 dark:bg-tile-4-dark',
    tile8: 'bg-tile-8 dark:bg-tile-8-dark',
    tile16: 'bg-tile-16 dark:bg-tile-16-dark',
    tile32: 'bg-tile-32 dark:bg-tile-32-dark',
    tile64: 'bg-tile-64 dark:bg-tile-64-dark',
    tile128: 'bg-tile-128 dark:bg-tile-128-dark',
    tile256: 'bg-tile-256 dark:bg-tile-256-dark',
    tile512: 'bg-tile-512 dark:bg-tile-512-dark',
    tile1024: 'bg-tile-1024 dark:bg-tile-1024-dark',
    tile2048: 'bg-tile-2048 dark:bg-tile-2048-dark',
    transparent: 'bg-transparent',
    black: 'bg-black',
    white: 'bg-white',
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${mini ? 'w-6 h-6 text-xs' : 'px-4 py-2 text-base'}
        ${width || ''}
        outline-none
        rounded
        cursor-none
        ${
          disabled
            ? 'opacity-50'
            : 'hover:bg-gray-500/80 dark:hover:bg-secondary-dark'
        }
        text-foreground dark:text-foreground-dark
        transition-colors duration-300
        disabled:opacity-50
        ${colorClasses[color]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
