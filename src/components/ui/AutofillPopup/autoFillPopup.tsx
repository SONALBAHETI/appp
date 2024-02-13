import React, { useState, useEffect } from "react";
import { FileUploadComponent } from "../UploadFile/UploadFileComponent";
import { readPdf } from "@/lib/parse-resume-from-pdf/read-pdf";
import { TextItems } from "@/lib/parse-resume-from-pdf/types";
import { groupTextItemsIntoLines } from "@/lib/parse-resume-from-pdf/group-text-items-into-lines";
import { groupLinesIntoSections } from "@/lib/parse-resume-from-pdf/group-lines-into-sections";
import { extractResumeFromSections } from "@/lib/parse-resume-from-pdf/extract-resume-from-sections";

export default function AutoFillPopup() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [fileUrl, setFileUrl] = useState<string>("");
  const [textItems, setTextItems] = useState<TextItems>([]);
  const lines = groupTextItemsIntoLines(textItems || []);
  const sections = groupLinesIntoSections(lines);
  const resume = extractResumeFromSections(sections);

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const textItems = await readPdf(fileUrl);
        setTextItems(textItems);
      } catch (error) {
        console.error("Error reading PDF:", error);
      }
    }
    if (fileUrl) {
      fetchData();
    }
  }, [fileUrl]);

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-20 right-4 bg-white border border-gray-400 rounded-md p-8 w-64 z-50 h-auto ">
          <p className="text-center font-bold">Auto-fill details</p>
          <p className="text-sm text-center font-normal p-2">
            Upload ATS compatible <br /> resume/cv
          </p>
          <FileUploadComponent
            onFileUrlChange={(fileUrl) => setFileUrl(fileUrl)}
            handleClose={handleClose}
          />
        </div>
      )}
    </>
  );
}
