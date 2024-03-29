"use client";
import React, { useEffect, useRef, useState } from "react";
import FileInput from "@/components/ui/FileInput";
import { useDocUploadMutation } from "@/api/sheerIdVerification";
import { toast } from "react-toastify";
import { IGetCurrentVerificationStepResponse } from "@/interfaces/verification";

export interface IVerificationDocumentUploadProps {
  onSubmitting: (isSubmitting: boolean) => void;
  verificationStatus: IGetCurrentVerificationStepResponse;
  onComplete?: () => void;
  children?: React.ReactNode;
}

export default function VerificationDocumentUpload({
  onSubmitting,
  verificationStatus,
  onComplete,
  children,
}: IVerificationDocumentUploadProps) {
  /* component states */
  const selectedFileRef = useRef<File | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  /* mutations */
  const docUploadMutation = useDocUploadMutation();

  useEffect(() => {
    const handleSaveAndNextEvent = async () => {
      try {
        onSubmitting(true);
        if (!selectedFileRef.current) {
          toast.error("Please select a file.");
          return;
        }
        const formData = new FormData();
        formData.append("file", selectedFileRef.current);
        await docUploadMutation.mutateAsync(formData);
        onComplete?.();
      } catch (error) {
        toast.error("Something went wrong while uploading the document.");
      } finally {
        onSubmitting(false);
      }
    };
    document.addEventListener("saveAndNextEvent", handleSaveAndNextEvent);
    return () => {
      document.removeEventListener("saveAndNextEvent", handleSaveAndNextEvent);
    };
  }, []);

  const setSelectedFileRef = (file: File | null) => {
    setSelectedFile(file);
    selectedFileRef.current = file;
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
        onFileChange={setSelectedFileRef}
      />

      {/* Document rejection reasons */}
      {verificationStatus?.rejectionReasons?.length ? (
        <div className="bg-destructive/5 rounded-lg p-4 flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <h6 className="text-faded">
              Your document was rejected for the following reasons:
            </h6>
            <ul className="list-disc ml-5 text-faded text-sm">
              {verificationStatus?.rejectionReasons?.map((reason) => (
                <li className="capitalize" key={reason}>
                  {reason.replaceAll("_", " ").toLowerCase()}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <></>
      )}

      {/* Any other details to add */}
      {children}
    </div>
  );
}
