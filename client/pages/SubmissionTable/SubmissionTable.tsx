import React, { useEffect, useState } from "react";
import axios from "axios";

interface Submission {
  step1Data: {
    name: string;
    email: string;
    phone: string;
    addressDetails: {
      addressLine1: string;
      addressLine2: string;
      city: string;
      state: string;
      pincode: string;
      country: string;
    };
  };
  step2Data: {
    selectedFiles: string[];
    location: string;
  };
  step3Data: { value: string; label: string }[];
  submissionDate: string;
}

const SubmissionTable: React.FC = () => {
  const [userData, setUserData] = useState<Submission[] | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [filteredSubmissions, setFilteredSubmissions] = useState<
    Submission[] | null
  >(null);

  useEffect(() => {
    const id = localStorage.getItem("id");

    // Fetch user data from the API
    axios
      .get(`http://localhost:3000/api/v1/user/${id}`)
      .then((response) => {
        setUserData(response.data.user.submissions);
        setFilteredSubmissions(response.data.user.submissions);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  useEffect(() => {
    // Filter submissions based on search term and date range
    if (userData) {
      const filtered = userData
        .filter(
          (submission) =>
            submission.step1Data.name
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            submission.step1Data.email
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
        )
        .filter(
          (submission) =>
            (!startDate || submission.submissionDate >= startDate) &&
            (!endDate || submission.submissionDate <= endDate)
        );
      setFilteredSubmissions(filtered);
    }
  }, [searchTerm, startDate, endDate, userData]);

  if (!filteredSubmissions) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Submission Table</h2>
      <div className="mb-4 flex flex-col md:flex-row md:items-center gap-4">
        <div className="w-full md:w-1/2">
          <label className="block text-gray-600 mb-2">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-2 border rounded w-full"
          />
        </div>
        <div className="w-full md:w-1/2">
          <label className="block text-gray-600 mb-2">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-2 border rounded w-full"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSubmissions.map((submission, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow-md">
            <h3 className="text-lg font-semibold mb-2">
              Submission {index + 1}
            </h3>
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
                  {Object.values(submission.step1Data.addressDetails).join(
                    ", "
                  )}
                </p>
              </div>
              <div>
                <p>Location: {submission.step2Data.location}</p>
                <div className="grid grid-cols-2 gap-2">
                  {submission.step2Data.selectedFiles.map((file, idx) => (
                    <img
                      key={idx}
                      src={`http://localhost:3000${file}`} // Update with your server URL
                      alt={`Uploaded File ${idx + 1}`}
                      className="max-w-full max-h-full"
                    />
                  ))}
                </div>
                <p>
                  {submission.step3Data
                    .map((option) => option.label)
                    .join(", ")}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubmissionTable;
