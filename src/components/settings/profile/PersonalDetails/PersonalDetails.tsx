import Link from "next/link";
import React, { useState } from "react";
import IdentityInfo from "./Identity/IdentityInfo";
import Education from "./Education/Education";
import License from "./License/License";
import Expertise from "./Expertise/Expertise";
import { Card, CardContent } from "@/components/ui/card";
import StepsContainer, {
  Step,
  StepContent,
  StepsList,
} from "@/components/ui/Steps/StepsContainer";
import AutoFillPopup from "@/components/ui/AutofillPopup/autoFillPopup";
import { Button } from "@/components/ui/button";

export default function PersonalDetails() {
  const saveAndNext = async (data: any): Promise<void> => {};

  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <Card className="shadow-md h-full">
      <CardContent className="mt-6">
        <AutoFillPopup></AutoFillPopup>
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
                <Button type="submit" onClick={saveAndNext}>
                  Save Changes
                </Button>
              </div>
            </StepsList>

            <StepContent stepNumber={0}>
              <IdentityInfo />
            </StepContent>
            <StepContent stepNumber={1}>
              <Education />
            </StepContent>
            <StepContent stepNumber={2}>
              <Expertise />
            </StepContent>
            <StepContent stepNumber={3}>
              <License />
            </StepContent>
          </StepsContainer>
        </div>
      </CardContent>
    </Card>
  );
}
