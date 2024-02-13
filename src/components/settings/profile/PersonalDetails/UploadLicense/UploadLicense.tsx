"use client";
import React, { useState } from "react";
import { Upload } from "lucide-react";
import FileUploadComponent from "@/components/ui/UploadFile/UploadFileComponent";

export default function UploadLicense() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = () => {
    // setSelectedFile(event.target.files[0]);
  };

  return (
    <FileUploadComponent
      isOpen={true}
      handleClose={handleFileChange}
    ></FileUploadComponent>
  );
}
