import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setStep2Data } from "../../store/userSlice";
import axios from "axios";

interface FileUploadStepProps {
  onPrevious: () => void;
  onNext: () => void;
  onCancel: () => void;
}

const FileUploadStep: React.FC<FileUploadStepProps> = ({
  onPrevious,
  onNext,
  onCancel,
}) => {
  const dispatch = useDispatch();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [location, setLocation] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const newFiles: File[] = Array.from(files);

      const validFiles = newFiles.filter(
        (file) => file.type === "image/png" || file.type === "application/pdf"
      );

      setSelectedFiles(validFiles);
    }
  };

  const handleNext = async () => {
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `http://localhost:3000/api/v1/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        const selectedFiles = data.fileUrls;

        const basicDetailsData = {
          location,
          selectedFiles,
        };

        dispatch(setStep2Data(basicDetailsData));
        onNext();
      } else {
        console.error("File upload failed");
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const handleCaptureLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();

            setLocation(data.display_name || "Location not found");
          } catch (error) {
            console.error("Error fetching location:", error);
          }
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      setLocation("Geolocation not supported");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-2xl font-semibold mb-4">
        Step 2: File Upload and Geolocation
      </h2>
      <div className="mb-4">
        <label className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
          Choose File
          <input
            type="file"
            multiple
            accept=".png, .pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>
      {selectedFiles.length > 0 && (
        <div className="mb-4">
          <p className="text-lg font-semibold">Selected Files:</p>
          <ul className="list-disc list-inside ml-4">
            {selectedFiles.map((file, index) => (
              <li key={index} className="mt-1">
                {file.name}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="mb-4">
        <button
          className="text-blue-500 hover:text-blue-700 underline"
          onClick={handleCaptureLocation}
        >
          Capture Geolocation
        </button>
        {location && (
          <p className="mt-2 text-green-600 font-semibold">{location}</p>
        )}
      </div>
      <div className="flex space-x-4">
        <button
          className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded"
          onClick={onPrevious}
        >
          Previous
        </button>
        <button
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="bg-green-400 hover:bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FileUploadStep;
