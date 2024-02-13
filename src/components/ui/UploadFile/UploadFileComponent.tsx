"use client";
import { useState } from "react";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";

const defaultFileState = {
  name: "",
  size: 0,
  fileUrl: "",
};

export const FileUploadComponent = ({
  onFileUrlChange,
  handleClose,
}: {
  onFileUrlChange: (fileUrl: string) => void;
  className?: string;
  handleClose: () => void;
}) => {
  const [file, setFile] = useState(defaultFileState);
  const [isHoveredOnDropzone, setIsHoveredOnDropzone] =
    useState<boolean>(false);
  const [hasNonPdfFile, setHasNonPdfFile] = useState<boolean>(false);

  const hasFile = Boolean(file.name);

  const setNewFile = (newFile: File) => {
    if (file.fileUrl) URL.revokeObjectURL(file.fileUrl);
    const { name, size } = newFile;
    const fileUrl = URL.createObjectURL(newFile);
    setFile({ name, size, fileUrl });
    onFileUrlChange(fileUrl);
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const newFile = event.dataTransfer.files[0];
    if (newFile.name.endsWith(".pdf")) {
      setHasNonPdfFile(false);
      setNewFile(newFile);
    } else {
      setHasNonPdfFile(true);
    }
    setIsHoveredOnDropzone(false);
  };

  const onInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFile = files[0];
    setNewFile(newFile);
  };

  const onRemove = () => {
    setFile(defaultFileState);
    onFileUrlChange("");
  };

  return (
    <div
      className={cn(
        "flex justify-center rounded-md border-gray-300 p-4",
        isHoveredOnDropzone && "border-sky-400 "
      )}
      onDragOver={(event) => {
        event.preventDefault();
        setIsHoveredOnDropzone(true);
      }}
      onDragLeave={() => setIsHoveredOnDropzone(false)}
      onDrop={onDrop}
    >
      <div className="border-dashed border-2 border-[#C5C5C5] bg-[#F5FBFB] p-4 rounded-md  justify-center">
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
        {!hasFile ? (
          <>
            <div className="flex items-center justify-center">
              <Upload className="h-5 w- text-gray-600 mr-2 text-emerald-600 hover:text-emerald-800" />
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
                onChange={onInputChange}
              />
            </div>
            <p
              className={`text-xs mt-1 text-center ${
                hasNonPdfFile ? "text-red-400" : "text-gray-500"
              }`}
            >
              Only PDF file is allowed
            </p>
          </>
        ) : (
          <div className="flex items-center justify-center gap-3 pt-3">
            <div className="pl-7 font-semibold text-gray-900">
              {file.name} - {getFileSizeString(file.size)}
            </div>
            <button
              type="button"
              className="outline-theme-blue rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
              title="Remove file"
              onClick={onRemove}
            >
              x
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const getFileSizeString = (fileSizeB: number) => {
  const fileSizeKB = fileSizeB / 1024;
  const fileSizeMB = fileSizeKB / 1024;
  if (fileSizeKB < 1000) {
    return fileSizeKB.toPrecision(3) + " KB";
  } else {
    return fileSizeMB.toPrecision(3) + " MB";
  }
};
