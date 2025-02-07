import styled from "styled-components"

export interface StyledInputProps {
  disable?: boolean;
  width?: string;
  fontSize?: number;
}



const StyledInput = styled.input<StyledInputProps>`
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: ${({ fontSize }) => fontSize ?? 16}px;
  &:focus {
    outline: none;
  }
  &:disabled {
    opacity: 0.5;
  }
  background: ${({ theme: { palette } }) => palette.tertiary};
  color: ${({ theme: { palette } }) => palette.black};
  width: ${({ width }) => width};
`;

export default StyledInput;
