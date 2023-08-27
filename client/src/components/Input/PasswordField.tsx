import React from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";
import zxcvbn from "zxcvbn";

interface PasswordInputProps {
  label: string;
  id: string;
  name: string;
  register: UseFormRegister<FieldValues>;
  placeholder: string;
  required?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  id,
  name,
  register,
  placeholder,
  required,
}) => {
  const [password, setPassword] = React.useState("");
  const passwordStrength = zxcvbn(password);

  const getPasswordStrengthColor = () => {
    switch (passwordStrength.score) {
      case 0:
      case 1:
        return "text-red-500";
      case 2:
        return "text-yellow-500";
      case 3:
      case 4:
        return "text-green-500";
      default:
        return "";
    }
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength.score) {
      case 0:
        return "";
      case 1:
        return "Weak";
      case 2:
        return "Medium";
      case 3:
      case 4:
        return "Strong";
      default:
        return "";
    }
  };

  return (
    <div>
      <label
        htmlFor={id}
        className="text-sm font-bold text-gray-700 flex flex-start"
      >
        {label}
      </label>
      <input
        {...register(name, { required })} // Apply validations here
        type="password"
        name={name}
        id={id}
        placeholder={placeholder}
        className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-gray-900"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className={`mt-1 text-sm font-medium ${getPasswordStrengthColor()}`}>
        {getPasswordStrengthText()}
      </div>
    </div>
  );
};

export default PasswordInput;
