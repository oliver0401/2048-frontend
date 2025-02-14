import React from 'react';
import Text from '../../components/Text';

interface RenderFieldProps {
  label: string;
  value: React.ReactNode;
}

export const RenderField: React.FC<RenderFieldProps> = ({ label, value }) => {
  const textProps = {
    color: 'primary' as const,
    fontSize: 18,
    className: 'capitalize',
  };
  return (
    <div className="flex items-center gap-2">
      <Text as="h1" {...textProps}>
        {label}:
      </Text>
      <Text
        as="div"
        {...textProps}
        className={`${textProps.className} flex items-center gap-2`}
      >
        {value}
      </Text>
    </div>
  );
};
