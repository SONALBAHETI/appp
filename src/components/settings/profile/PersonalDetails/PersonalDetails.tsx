"use client";

import Link from "next/link";
import React, { useState } from "react";
import IdentityInfo from "./Identity/IdentityInfo";
import Education from "./Education/Education";
import { LicenseVerification } from "./License";
import Expertise from "./Expertise/Expertise";
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
import { useCurrentStudentVerificationStepQuery } from "@/api/studentVerification";
import { Role } from "@/constants/user";
import StudentVerification from "./StudentVerification";

/**
 * This component is used to display "Profile Settings" tab.
 */

export default function PersonalDetails({ userRole }: { userRole: Role }) {
  const [stepQueryParam, setStepQueryParam] = useQueryState("step");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(
    stepQueryParam ? +stepQueryParam - 1 : 0
  );
  const isMentor =
    userRole === Role.UNVERIFIED_MENTOR || userRole === Role.MENTOR;

  // license verification step (only used for mentor's license verification so disabling for other roles)
  const currentVerificationStepQuery =
    useCurrentVerificationStepQuery(isMentor);

  const currentStudentVerificationStepQuery =
    useCurrentStudentVerificationStepQuery(userRole === Role.MENTEE);

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

  // hide action buttons when license or student verification is successful
  let showActionButtons = true;
  if (isMentor && activeStep === 3 && currentVerificationStepQuery.data) {
    showActionButtons =
      currentVerificationStepQuery.data.currentStep !== "success";
  } else {
    showActionButtons =
      activeStep !== 2 ||
      currentStudentVerificationStepQuery.data?.currentStep !== "success";
  }

  const renderActionButtons = () => {
    return (
      <div className="ml-auto flex items-center gap-6">
        <Link
          href="/" /** @todo change to profile url */
          className="underline underline-offset-4 text-foreground"
        >
          View Profile
        </Link>
        <Button className="py-5" disabled={isSubmitting} onClick={submit}>
          {isSubmitting && <Loader className="mr-1" />}
          {isSubmitting
            ? "Saving..."
            : activeStep === 3
            ? "Submit"
            : "Save & Next"}
        </Button>
      </div>
    );
  };

  return (
    <div className="flex items-center">
      <StepsContainer
        className="w-full"
        activeStep={activeStep}
        onStepChange={onStepChange}
      >
        <StepsList className="mb-6 h-full">
          <Step>Personal Details</Step>
          <Step>Education</Step>
          {(userRole === Role.MENTOR ||
            userRole === Role.UNVERIFIED_MENTOR) && (
            <>
              <Step>Expertise</Step>
              <Step>License</Step>
            </>
          )}
          {userRole === Role.MENTEE && <Step>Student Identity</Step>}

          {showActionButtons && renderActionButtons()}
        </StepsList>

        <StepContent stepNumber={0}>
          <IdentityInfo
            userRole={userRole}
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
        {(userRole === Role.MENTOR || userRole === Role.UNVERIFIED_MENTOR) && (
          <>
            <StepContent stepNumber={2}>
              <Expertise
                onSubmitting={setIsSubmitting}
                onComplete={handleStepComplete}
              />
            </StepContent>
            <StepContent stepNumber={3}>
              <LicenseVerification onSubmitting={setIsSubmitting} />
            </StepContent>
          </>
        )}
        {userRole === Role.MENTEE && (
          <>
            <StepContent stepNumber={2}>
              <StudentVerification onSubmitting={setIsSubmitting} />
            </StepContent>
          </>
        )}
      </StepsContainer>
    </div>
  );
}
