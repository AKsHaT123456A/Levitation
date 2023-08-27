import React, { useState } from "react";

interface FileDisplayProps {
  fileUrls: string[];
}

const FileDisplay: React.FC<FileDisplayProps> = ({ fileUrls }) => {
  return (
    <div>
      <h2>Uploaded Files</h2>
      <div>
        {fileUrls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Uploaded File ${index + 1}`}
            style={{
              maxWidth: "100px",
              maxHeight: "100px",
              marginRight: "10px",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default FileDisplay;
