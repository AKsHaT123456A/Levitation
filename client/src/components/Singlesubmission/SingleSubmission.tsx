import React from "react";
import FileDisplay from "../FileDisplay/FileDisplay";

interface SubmissionItemProps {
  submission: Submission;
  index: number;
}

const SubmissionItem: React.FC<SubmissionItemProps> = ({
  submission,
  index,
}) => {
  return (
    <div key={index} className="bg-white rounded-lg p-4 shadow-md">
      <h3 className="text-lg font-semibold mb-2">Submission {index + 1}</h3>
      <p className="text-sm text-gray-600 mb-2">
        Submission Date:{" "}
        {new Date(submission.submissionDate).toLocaleDateString()}
      </p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p>Name: {submission.step1Data.name}</p>
          <p>Email: {submission.step1Data.email}</p>
          <p>Phone: {submission.step1Data.phone}</p>
          <p>
            Address:{" "}
            {Object.values(submission.step1Data.addressDetails).join(", ")}
          </p>
        </div>
        <div>
          <p>Location: {submission.step2Data.location}</p>
          <div className="grid grid-cols-2 gap-2">
            <FileDisplay fileUrls={submission.step2Data.selectedFiles} />
          </div>
          <p>{submission.step3Data.map((option) => option.label).join(", ")}</p>
        </div>
      </div>
    </div>
  );
};

export default SubmissionItem;
