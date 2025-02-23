import React from 'react';
import { Color } from '../../themes/types';

export interface TextProps {
  as?:
    | 'p'
    | 'span'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'label'
    | 'div'
    | 'pre';
  color?: Color;
  fontSize?: number;
  fontWeight?: 'bold' | 'normal';
  textTransform?: 'capitalize' | 'lowercase' | 'uppercase' | 'none';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Text: React.FC<TextProps> = ({
  as: Component = 'span',
  color = 'foreground',
  fontSize = 14,
  fontWeight,
  textTransform,
  children,
  className,
  onClick,
}) => {
  const colorClasses = {
    primary: 'text-primary dark:text-primary-dark',
    secondary: 'text-secondary dark:text-secondary-dark',
    tertiary: 'text-tertiary dark:text-tertiary-dark',
    foreground: 'text-foreground dark:text-foreground-dark',
    background: 'text-background dark:text-background-dark',
    tile2: 'text-tile-2 dark:text-tile-2-dark',
    tile4: 'text-tile-4 dark:text-tile-4-dark',
    tile8: 'text-tile-8 dark:text-tile-8-dark',
    tile16: 'text-tile-16 dark:text-tile-16-dark',
    tile32: 'text-tile-32 dark:text-tile-32-dark',
    tile64: 'text-tile-64 dark:text-tile-64-dark',
    tile128: 'text-tile-128 dark:text-tile-128-dark',
    tile256: 'text-tile-256 dark:text-tile-256-dark',
    tile512: 'text-tile-512 dark:text-tile-512-dark',
    tile1024: 'text-tile-1024 dark:text-tile-1024-dark',
  };

  return (
    <Component
      className={`
        ${color ? colorClasses[color as keyof typeof colorClasses] : ''}
        ${textTransform ? `${textTransform}` : ''}
        ${fontWeight ? `font-${fontWeight}` : ''}
        ${Component === 'p' ? 'm-0 leading-8' : 'leading-5'}
        ${className}
      `}
      style={{ fontSize: `${fontSize}px` }}
      onClick={onClick}
    >
      {children}
    </Component>
  );
};

export default Text;
