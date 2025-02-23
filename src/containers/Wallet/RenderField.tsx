import React from 'react';
import Text from '../../components/Text';

interface RenderFieldProps {
  label: React.ReactNode;
  value: React.ReactNode;
}

export const RenderField: React.FC<RenderFieldProps> = ({ label, value }) => {
  const textProps = {
    color: 'primary' as const,
    fontSize: 24,
    className: 'capitalize font-bold',
  };
  return (
    <div className="w-full flex items-center justify-between gap-8 px-4 py-4 rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-105">
      <Text as="h2" {...textProps} className="text-primary dark:text-primary-dark tracking-wide">
        {label}
      </Text>
      <Text
        as="div"
        {...textProps}
        className={`${textProps.className} flex items-center gap-3 text-gray-800 backdrop-blur-sm`}
      >
        {value}
      </Text>
    </div>
  );
};
