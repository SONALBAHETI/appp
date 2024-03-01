"use client";
import { createContext } from "react";
import React, { useState, ReactNode } from "react";
import { Resume } from "@/lib/parse-resume-from-pdf/types"; // Assuming you have defined Resume type

interface IResumeContext {
  resume: Resume | null;
  setResume: (resume: Resume) => void;
}

export const ResumeContext = createContext<IResumeContext>({
  resume: null,
  setResume: () => {},
});

interface ResumeProviderProps {
  children: ReactNode;
}

export const ResumeProvider: React.FC<ResumeProviderProps> = ({ children }) => {
  const [resume, setResume] = useState<Resume | null>(null);

  return (
    <ResumeContext.Provider value={{ resume, setResume }}>
      {children}
    </ResumeContext.Provider>
  );
};
