import { useState } from "react";
import { TOption } from "../types";

export const useDropDown = (options: TOption[]) => {
  const [selectedOption, setSelectedOption] = useState<TOption>(options[0]);
  const onSelect = (option: TOption) => {
    setSelectedOption(option);
  };

  return { selectedOption, onSelect };
};


