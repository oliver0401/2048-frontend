import React from 'react';
import { Color } from '../../themes/types';

export interface TextProps {
  as?: 'p' | 'span';
  color?: Color;
  fontSize?: number;
  fontWeight?: 'bold' | 'normal';
  textTransform?: 'capitalize' | 'lowercase' | 'uppercase' | 'none';
  children: React.ReactNode;
}

const Text: React.FC<TextProps> = ({
  as: Component = 'span',
  color = 'foreground',
  fontSize = 14,
  fontWeight,
  textTransform,
  children,
}) => {
  const colorClasses = {
    primary: 'text-primary dark:text-primary-dark',
    secondary: 'text-secondary dark:text-secondary-dark',
    tertiary: 'text-tertiary dark:text-tertiary-dark',
    foreground: 'text-foreground dark:text-foreground-dark',
    background: 'text-background dark:text-background-dark',
  };

  return (
    <Component
      className={`
        ${color ? colorClasses[color as keyof typeof colorClasses] : ''}
        ${textTransform ? `${textTransform}` : ''}
        ${fontWeight ? `font-${fontWeight}` : ''}
        ${Component === 'p' ? 'm-0 leading-8' : 'leading-5'}
      `}
      style={{ fontSize: `${fontSize}px` }}
    >
      {children}
    </Component>
  );
};

export default Text; 