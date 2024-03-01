"use client";

import FileInput from "@/components/ui/FileInput";
import { useContext, useEffect, useState } from "react";
import { parseResumeFromPdf } from "@/lib/parse-resume-from-pdf";
import { ResumeContext } from "@/context/ResumeContext";
import { toast } from "react-toastify";

export default function ResumeAutoFill() {
  const { setResume } = useContext(ResumeContext);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    async function extractDataFromResume(fileUrl: string) {
      try {
        const resume = await parseResumeFromPdf(fileUrl);
        setResume(resume);
      } catch (error) {
        console.error("Error reading PDF: ", error);
        toast.error("Something went wrong while reading PDF");
      }
    }
    if (selectedFile) {
      const fileUrl = URL.createObjectURL(selectedFile);
      extractDataFromResume(fileUrl);
    }
  }, [selectedFile]);

  return (
    <div className="flex flex-col gap-y-2">
      <div>
        <h6>Auto-fill details</h6>
        <p className="text-sm">
          Upload ATS compatible resume/cv to auto-fill details
        </p>
      </div>
      <FileInput
        className="py-10"
        accept=".jpg, .jpeg, .png, .pdf"
        selected={selectedFile}
        onFileChange={setSelectedFile}
      />
    </div>
  );
}
