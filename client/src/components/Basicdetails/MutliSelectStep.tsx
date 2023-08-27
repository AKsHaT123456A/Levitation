import React, { useState } from "react";
import Select from "react-select";
import { setStep3Data } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface MultiSelectStepProps {
  onPrevious: () => void;
  onNext: () => void;
  onCancel: () => void;
  onSubmit: () => void;
}

const MultiSelectStep: React.FC<MultiSelectStepProps> = ({
  onPrevious,
  onCancel,
}) => {
  const navigate = useNavigate();

  const step1Data = useSelector((state) => state.form.step1Data);
  const step2Data = useSelector((state) => state.form.step2Data);
  console.log(step1Data, step2Data);
  
  const [selectedOptions, setSelectedOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const options = [
    { value: "Option 1", label: "Option 1" },
    { value: "Option 2", label: "Option 2" },
    { value: "Option 3", label: "Option 3" },
    { value: "Option 4", label: "Option 4" },
  ];

  const handleOptionChange = (selectedValues: any) => {
    setSelectedOptions(selectedValues);
  };

  const handleFormSubmit = async () => {
    try {
      const formData = {
        step1Data,
        step2Data,
        step3Data: selectedOptions,
        submissionDate: new Date().toISOString(),
      };
      const id = localStorage.getItem("id");
      const token = localStorage.getItem("token");
  console.log(token);
  
      const response = await axios.post(
        `http://localhost:3000/api/v1/details/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      navigate("/user");
      console.log(response);
    } catch (error) {
      const errMessage = error.response.data.message;
      console.error(errMessage);
    }
  };
  
  

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-xl font-semibold mb-4">
        Step 3: Multi-Field Select Dropdown
      </h2>
      <div className="w-full md:w-2/3 lg:w-1/2">
        <Select
          isMulti
          options={options}
          value={selectedOptions}
          onChange={handleOptionChange}
          className="bg-gray-100 border rounded-md p-2"
          styles={{
            control: (provided, state) => ({
              ...provided,
              border: state.isFocused
                ? "1px solid #3498db"
                : "1px solid #d1d5db",
            }),
            multiValue: (provided) => ({
              ...provided,
              backgroundColor: "#48bb78",
              color: "white",
            }),
            multiValueLabel: (provided) => ({
              ...provided,
              color: "white",
            }),
            multiValueRemove: (provided) => ({
              ...provided,
              color: "white",
              ":hover": {
                backgroundColor: "#2f855a",
              },
            }),
          }}
        />
      </div>
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 mt-4 md:space-x-2">
        <button
          className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded w-full md:w-auto"
          onClick={onPrevious}
        >
          Previous
        </button>
        <button
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded w-full md:w-auto"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded w-full md:w-auto"
          onClick={handleFormSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default MultiSelectStep;
