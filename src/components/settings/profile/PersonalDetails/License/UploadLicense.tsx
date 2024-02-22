"use client";
import React, { useState } from "react";
import FileInput from "@/components/ui/FileInput";

export default function UploadLicense() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = () => {
    // TODO
  };

  return (
    <div className="flex flex-col gap-y-4 p-6 border rounded-lg">
      <div>
        <h5>We need more information</h5>
        <p className="text-faded">
          Documents will be reviewed in a few minutes by staff at SheerID, our
          trusted partner.
        </p>
      </div>
      <FileInput
        className="py-10"
        accept=".jpg, .jpeg, .png, .pdf"
        selected={selectedFile}
        onFileChange={setSelectedFile}
      />
      <div className="bg-secondary rounded-lg p-4 flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <h6 className="text-faded">
            Upload an official document that shows:
          </h6>
          <ul className="list-disc ml-5 text-faded text-sm">
            <li>Your full name</li>
            <li>Your medical professional status</li>
            <li>A currently valid date</li>
          </ul>
        </div>
        <div className="flex flex-col gap-1">
          <h6 className="text-faded">Acceptable examples include:</h6>
          <ul className="list-disc ml-5 text-faded text-sm">
            <li>Certificate of license</li>
            <li>Nursing ID card with expiration date</li>
            <li>Photo ID and recent Pay Stub</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
