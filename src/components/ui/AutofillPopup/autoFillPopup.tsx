import React, { useState } from "react";
import { Upload } from "lucide-react";
import FileUploadComponent from "../UploadFile/UploadFile";

export default function AutoFillPopup() {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-20 right-4 bg-white border border-gray-400 rounded-md p-10 z-50 h-auto ">
          <p className="text-center font-bold">Auto-fill details</p>
          <p className="text-sm text-center font-normal p-2">
            Upload ATS compatible <br /> resume/cv
          </p>
          <FileUploadComponent
            isOpen={true}
            handleClose={handleClose}
          ></FileUploadComponent>
        </div>
      )}
    </>
  );
}
