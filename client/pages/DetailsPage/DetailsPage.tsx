import React, { useState } from "react";
import BasicDetailsStep from "../../src/components/Basicdetails/BasicDetailsStep";
import FileUploadStep from "../../src/components/Basicdetails/FileUploadStep";
import MultiSelectStep from "../../src/components/Basicdetails/MutliSelectStep";
import ProgressIndicator from "../../src/components/ProgressIndicator/ProgressIndicator";

const BasicDetails: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    // Simulate form submission (you can make an API call here)
    setSubmissionStatus("idle");
    setTimeout(() => {
      // Simulate success
      setSubmissionStatus("success");
    }, 1000);
  };

  const handleCancel = () => {
    setCurrentStep(0); // Reset to the first step
  };

  const steps = [
    <BasicDetailsStep
  onPrevious={handlePrevious}
  onNext={handleNext}
  onCancel={handleCancel}
/>
,
    <FileUploadStep onPrevious={handlePrevious} onNext={handleNext} onCancel={handleCancel} />,
    <MultiSelectStep
      onPrevious={handlePrevious}
      onNext={handleSubmit}
      onCancel={handleCancel}
      onSubmit={handleSubmit}
    />,
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
      <h1 className="mb-4 text-2xl font-semibold">Multi-Step Form</h1>

      <div className="mt-4 w-full max-w-md">
        {steps[currentStep]}
        <div className="mt-4">
          <ProgressIndicator
            totalSteps={steps.length}
            currentStep={currentStep}
          />
        </div>
      </div>
      {submissionStatus === "success" && (
        <p className="mt-4 text-green-600">Form submitted successfully!</p>
      )}
      {submissionStatus === "error" && (
        <p className="mt-4 text-red-600">
          Form submission failed. Please try again.
        </p>
      )}
    </div>
  );
};

export default BasicDetails;
