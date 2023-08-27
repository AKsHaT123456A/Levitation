import React from "react";

interface CheckboxProps {
  label: string;
  id: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, id }) => (
  <div className="flex items-center">
    <input
      type="checkbox"
      className="h-4 w-4 text-blue-300 rounded"
      name={id}
      id={id}
    />
    <label htmlFor={id} className="ml-2 text-sm text-gray-600">
      {label}
    </label>
  </div>
);

export default Checkbox;
