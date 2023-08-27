import React from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";

interface InputProps {
  label: string;
  id: string;
  type: string;
  name: string;
  register: UseFormRegister<FieldValues>;
  placeholder: string;
  required?: boolean;
  pattern?: RegExp;
  onChange?: (value: string | FileList) => void; 
}

const InputField: React.FC<InputProps> = ({
  label,
  id,
  type,
  name,
  register,
  placeholder,
  required,
  pattern,
  onChange,
}) => {
  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    if (type === "file" && onChange) {
      onChange(event.target.files as FileList);
    } else if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor={id} className="text-sm font-bold text-gray-700">
        {label}
      </label>
      <input
        {...register(name, { required, pattern })}
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        onChange={handleInputChange}
        className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-gray-900"
      />
    </div>
  );
};

export default InputField;
