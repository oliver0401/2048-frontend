import React, { FC } from 'react';

export interface SwitchProps {
  checked: boolean;

  activeValue: string;
  inactiveValue: string;
  title?: string;
  onChange: (value: string) => void;
}

const Switch: FC<SwitchProps> = ({
  checked,
  activeValue,
  inactiveValue,
  title,
  onChange,
}) => (
  <div className="flex items-center">
    {title && (
      <div className="mr-3">
        <span className="text-primary dark:text-primary-dark capitalize text-base">
          {title}
        </span>
      </div>
    )}
    <div
      className="relative w-10 h-5 leading-5 align-middle rounded-2xl overflow-hidden cursor-pointer"
      onClick={() => onChange(checked ? inactiveValue : activeValue)}
    >
      <input
        type="checkbox"
        className="absolute w-0 h-0 opacity-0 m-0"
        defaultChecked={checked}
        value={checked ? activeValue : inactiveValue}
      />
      <div
        className={`
          absolute inset-0 transition-colors duration-200 ease-in-out
          ${checked ? 'bg-white dark:bg-white' : 'bg-black dark:bg-white'}
        `}
      >
        <div
          className={`
            absolute top-1 w-3 h-3 rounded-full transition-transform duration-200 ease-in-out bg-background dark:bg-background-dark
            ${checked 
              ? 'translate-x-6' 
              : 'translate-x-1'}
          `}
        />
      </div>
    </div>
  </div>
);

export default Switch;
