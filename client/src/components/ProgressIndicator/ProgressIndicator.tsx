// ProgressIndicator.js
import React from "react";

const ProgressIndicator = ({ totalSteps, currentStep }) => {
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="w-full bg-gray-300 rounded-full">
      <div
        className={`h-2 ${
          currentStep === 0
            ? "bg-green-300"
            : "bg-gradient-to-r from-green-300 to-green-600"
        } rounded-full`}
        style={{ width: `${progressPercentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressIndicator;
