"use client";

import Link from "next/link";
import React, { useState } from "react";
import IdentityInfo from "./Identity/IdentityInfo";
import Education from "./Education/Education";
import { LicenseVerification } from "./License";
import Expertise from "./Expertise/Expertise";
import { Card, CardContent } from "@/components/ui/card";
import StepsContainer, {
  Step,
  StepContent,
  StepsList,
} from "@/components/ui/Steps/StepsContainer";
import { Button } from "@/components/ui/button";
import { createCustomEvent } from "@/lib/events";
import Loader from "@/components/ui/Loader";
import { useQueryState } from "nuqs";
import { useCurrentVerificationStepQuery } from "@/api/mentorVerification";

export default function PersonalDetails() {
  const [stepQueryParam, setStepQueryParam] = useQueryState("step");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(
    stepQueryParam ? +stepQueryParam - 1 : 0
  );
  const currentVerificationStepQuery = useCurrentVerificationStepQuery();

  const onStepChange = (step: number) => {
    setStepQueryParam((step + 1).toString());
    setActiveStep(step);
  };

  const handleStepComplete = () => {
    onStepChange(activeStep + 1);
  };

  const submit = () => {
    // to be handled in child components
    document.dispatchEvent(createCustomEvent("saveAndNextEvent"));
  };

  // hide action buttons when license verification is successful
  const showActionButtons =
    activeStep === 3 && currentVerificationStepQuery.data
      ? currentVerificationStepQuery.data.currentStep !== "success"
      : true;

  return (
    <div className="flex items-center">
      <StepsContainer
        className="w-full"
        activeStep={activeStep}
        onStepChange={onStepChange}
      >
        <StepsList className="mb-6">
          <Step>Identity Info</Step>
          <Step>Education</Step>
          <Step>Expertise</Step>
          <Step>License</Step>

          {showActionButtons && (
            <div className="ml-auto flex items-center gap-6">
              <Link
                href="/"
                className="underline underline-offset-4 text-foreground"
              >
                View Profile
              </Link>
              <Button disabled={isSubmitting} onClick={submit}>
                {isSubmitting && <Loader className="mr-1" />}
                {isSubmitting
                  ? "Saving..."
                  : activeStep === 3
                  ? "Submit"
                  : "Save & Next"}
              </Button>
            </div>
          )}
        </StepsList>

        <StepContent stepNumber={0}>
          <IdentityInfo
            onSubmitting={setIsSubmitting}
            onComplete={handleStepComplete}
          />
        </StepContent>
        <StepContent stepNumber={1}>
          <Education
            onSubmitting={setIsSubmitting}
            onComplete={handleStepComplete}
          />
        </StepContent>
        <StepContent stepNumber={2}>
          <Expertise
            onSubmitting={setIsSubmitting}
            onComplete={handleStepComplete}
          />
        </StepContent>
        <StepContent stepNumber={3}>
          <LicenseVerification onSubmitting={setIsSubmitting} />
        </StepContent>
      </StepsContainer>
    </div>
  );
}
