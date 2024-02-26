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

export default function PersonalDetails() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(0);

  const submit = () => {
    // to be handled in child components
    document.dispatchEvent(createCustomEvent("saveAndNextEvent"));
  };

  return (
    <Card className="shadow-md h-full">
      <CardContent className="mt-6">
        <div className="flex items-center">
          <StepsContainer
            className="w-full"
            activeStep={activeStep}
            onStepChange={setActiveStep}
          >
            <StepsList className="mb-6">
              <Step>Identity Info</Step>
              <Step>Education</Step>
              <Step>Expertise</Step>
              <Step>License</Step>

              <div className="ml-auto flex items-center gap-6">
                <Link
                  href="/"
                  className="underline underline-offset-4 text-foreground"
                >
                  View Profile
                </Link>
                <Button onClick={submit}>
                  {isSubmitting && <Loader />}
                  {isSubmitting
                    ? "Saving..."
                    : activeStep === 3
                    ? "Submit"
                    : "Save & Next"}
                </Button>
              </div>
            </StepsList>

            <StepContent stepNumber={0}>
              <IdentityInfo onSubmitting={setIsSubmitting} />
            </StepContent>
            <StepContent stepNumber={1}>
              <Education />
            </StepContent>
            <StepContent stepNumber={2}>
              <Expertise />
            </StepContent>
            <StepContent stepNumber={3}>
              <LicenseVerification />
            </StepContent>
          </StepsContainer>
        </div>
      </CardContent>
    </Card>
  );
}
