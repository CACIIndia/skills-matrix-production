import React from "react";
import Select, { StylesConfig } from "react-select";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  isDisabled?: boolean;
  name?: string;
  value: Option | null;
  onChange: (selected: Option | null) => void;
  onBlur?: () => void;
  isLoading?: boolean;
  placeholder?: string;
}

const customStyles: StylesConfig<Option, false> = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "#f9fafb",
    borderColor: "#d1d5db",
    boxShadow: "none",
   // "&:hover": { borderColor: "#9ca3af" },
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: 'none',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#2563eb" : state.isFocused ? "#eff6ff" : "white",
    color: state.isSelected ? "white" : "#111827",
  }),
};

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  isDisabled = false,
  name,
  value,
  onChange,
  onBlur,
  isLoading = false,
  placeholder = "Select an option...",
}) => {
  return (
    <Select
      options={options}
      isDisabled={isDisabled}
      name={name}
      maxMenuHeight={200}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      isLoading={isLoading}
      placeholder={placeholder}
      isClearable
      styles={customStyles}
    />
  );
};

export default CustomSelect;
