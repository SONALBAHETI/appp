import React, { useState } from "react";
import { Upload } from "lucide-react";

interface FileUploadProps {
  isOpen: boolean;
  handleClose: () => void;
}

const FileUploadComponent: React.FC<FileUploadProps> = ({ isOpen, handleClose }) => {
  return (
    <>
      {isOpen && (
        <div className="bg-white rounded-md  z-50 h-auto">
          <div className="border-dashed border-2 border-[#C5C5C5] bg-[#F5FBFB] p-4 rounded-md  justify-center">
            <div className="flex items-center justify-center">
              <Upload className="h-5 w-5 text-gray-600 mr-2 text-emerald-600 hover:text-emerald-800" />
              <label
                htmlFor="fileInput"
                className="cursor-pointer text-emerald-600 font-bold hover:text-emerald-800"
              >
                Upload File
              </label>
              <input
                type="file"
                id="fileInput"
                accept=".jpg, .jpeg, .png, .gif, .bmp, .pdf"
                className="hidden"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1 text-center">Only PDF file is allowed</p>
          </div>
          <button
            onClick={handleClose}
            className="absolute top-1 right-1 p-1 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 1a9 9 0 00-9 9 9 9 0 009 9 9 9 0 009-9 9 9 0 00-9-9zm5.293 5.293a1 1 0 00-1.414-1.414L10 8.586 6.121 4.707a1 1 0 10-1.414 1.414L8.586 10l-3.879 3.879a1 1 0 101.414 1.414L10 11.414l3.879 3.879a1 1 0 001.414-1.414L11.414 10l3.879-3.879z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default FileUploadComponent;
