import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  width?: string;
  fontSize?: number;
  type?: 'text' | 'password' | 'email';
  className?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  width = '100%',
  fontSize = 16,
  type = 'text',
  className,
  error,
  ...props
}) => {
  return (
    <div className="relative w-full">

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
        {...props}
      />
      <p className='text-red-500 text-sm'>{error}</p>
    </div>


  );
};

export default Input;
