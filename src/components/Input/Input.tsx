import React from "react";
import StyledInput from "./StyledInput";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  disable?: boolean;
  width?: string;
  fontSize?: number;
}

export const Input: React.FC<InputProps> = ({ disable, ...props }) => {
  return <StyledInput disable={disable} {...props} />;
};

export default Input;
