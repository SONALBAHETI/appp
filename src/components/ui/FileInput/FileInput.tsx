"use client";

import React from "react";
import { useState } from "react";
import { Upload } from "lucide-react";
import { Label } from "../label";
import { IconType } from "../Icon";
import ButtonIcon from "../ButtonIcon";
import { cn } from "@/lib/utils";

const getFileSizeString = (fileSizeB: number) => {
  const fileSizeKB = fileSizeB / 1024;
  const fileSizeMB = fileSizeKB / 1024;
  if (fileSizeKB < 1000) {
    return fileSizeKB.toPrecision(3) + " KB";
  } else {
    return fileSizeMB.toPrecision(3) + " MB";
  }
};

// PropTypes in case multiple is true
type TMultipleFileInputProps = {
  multiple: true;
  selected?: FileList | null;
  onFileChange?: (files: FileList | null) => void;
};

// PropTypes in case multiple is false
type TSingleFileInputProps = {
  multiple?: false;
  selected?: File | null;
  onFileChange?: (file: File | null) => void;
};

type TConditionalProps = TMultipleFileInputProps | TSingleFileInputProps;

export type IFileInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "multiple" // Omitting the "multiple" prop so that we can use the TConditionalProps
> &
  TConditionalProps & {
    label?: string;
  };

const FileInput = React.forwardRef<HTMLInputElement, IFileInputProps>(
  (
    {
      className,
      onFileChange,
      label = "Upload File",
      selected: selectedFiles,
      accept,
      multiple,
      ...props
    },
    ref
  ) => {
    const [isHoveredOnDropzone, setIsHoveredOnDropzone] =
      useState<boolean>(false);
    const [hasNonAcceptedFile, setHasNonAcceptedFile] =
      useState<boolean>(false);

    const hasFile = !!selectedFiles;

    const containerClass = cn(
      "group border-dashed border-2 border-file-border p-4 rounded-md flex flex-col items-center justify-center gap-y-2",
      className
    );

    const onFileChangeHandler = (files: FileList | null) => {
      if (multiple) {
        onFileChange?.(files);
      } else {
        onFileChange?.(files ? (files[0] as File) : null);
      }
      setHasNonAcceptedFile(false);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onFileChangeHandler(e.target.files);
    };

    const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      const files = e.dataTransfer.files;
      // Get the valid file extensions from the accept prop
      const validExtensions = accept?.split(",").map((ext) => ext.trim()) || [];
      // Get file extensions for all files
      const fileExtensions = Array.from(files).map(
        (file) => file.name.split(".").pop() as string
      );
      // Filter out invalid files
      const invalidFiles = fileExtensions.filter(
        (extension) => !validExtensions.includes(`.${extension}`)
      );
      // Call onFileChange with valid files
      if (invalidFiles.length === 0) {
        onFileChangeHandler(files);
      } else {
        // Handle invalid file extensions
        setHasNonAcceptedFile(true);
      }
      setIsHoveredOnDropzone(false);
    };

    return (
      <>
        {!hasFile && (
          <>
            {/* Label with Dropzone */}
            <Label
              htmlFor="fileInput"
              onDragOver={(event) => {
                event.preventDefault();
                setIsHoveredOnDropzone(true);
              }}
              onDragLeave={() => setIsHoveredOnDropzone(false)}
              onDrop={onDrop}
              className={cn(
                "cursor-pointer bg-accent-2-lite/80 hover:bg-accent-2-lite text-md",
                containerClass,
                isHoveredOnDropzone ? "border-primary/50" : ""
              )}
            >
              <div className="flex flex-col items-center gap-y-2">
                {/* Icon & Label */}
                <div className="flex items-center text-accent-2/80 group-hover:text-accent-2">
                  <Upload className="h-5 mr-2" />
                  <span className="font-bold">{label}</span>
                </div>
                {/* Accepted file types */}
                {accept && (
                  <span
                    className={`text-sm font-light ${
                      hasNonAcceptedFile ? "text-destructive" : "text-faded/80"
                    }`}
                  >
                    Accepted file types: {accept}
                  </span>
                )}
              </div>
            </Label>
            {/* Hidden file input */}
            <input
              ref={ref}
              type="file"
              id="fileInput"
              accept={accept}
              className="hidden"
              onChange={handleFileChange}
              multiple={multiple}
              {...props}
            />
          </>
        )}
        {hasFile && (
          <div className={containerClass}>
            <div className="flex items-center gap-3">
              <div className="text-faded text-sm">
                {/* Selected files */}
                {selectedFiles instanceof FileList ? (
                  Array.from(selectedFiles).map((file) => (
                    <div key={file.name}>
                      {file.name} - {getFileSizeString(file.size)}
                    </div>
                  ))
                ) : (
                  <div>
                    {selectedFiles.name} -{" "}
                    {getFileSizeString(selectedFiles.size)}
                  </div>
                )}
              </div>
              {/* Remove files button */}
              <ButtonIcon
                variant="ghost"
                iconType={IconType.X}
                iconSize={18}
                size="icon"
                onClick={() => onFileChange?.(null)}
              />
            </div>
          </div>
        )}
      </>
    );
  }
);

export default FileInput;
