import React from "react";

interface InputProps {
  placeholder?: string;
  width?: string;
  fontSize?: number;
  type?: 'text' | 'password' | 'email';
  className?: string;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  width = '100%',
  fontSize = 16,
  type = 'text',
  className,
}) => {
  return (
    <input

      type={type}
      placeholder={placeholder}
      className={`
        w-full px-4 py-2
        bg-transparent
        border border-primary dark:border-primary-dark
        rounded
        outline-none
        text-primary dark:text-primary-dark

        placeholder:text-primary/50 dark:placeholder:text-primary-dark/50
        focus:border-secondary dark:focus:border-secondary-dark
        transition-colors duration-200
        ${className}
      `}
      style={{
        width,
        fontSize: `${fontSize}px`,
      }}

    />
  );
};

export default Input;
