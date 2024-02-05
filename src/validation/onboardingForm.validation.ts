import { UserObjectives, UserOccupations } from "@/constants/onboarding";
import { z } from "zod";

export const OnboardingFormSchema = z
  .object({
    userOccupation: z.string().default(""),
    userObjective: z.string().default(""),
    primaryAreasOfInterest: z.array(z.string()).default([]),
    primaryAreasOfPractice: z.array(z.string()).default([]),
    areasOfExpertise: z.array(z.string()).default([]),
  })
  .refine(
    (data) => {
      if (!data.userOccupation) {
        return false;
      }
      return true;
    },
    {
      message: "Please select an option",
      path: ["userOccupation"],
    }
  )
  .refine(
    (data) => {
      if (data.userOccupation === UserOccupations.HEALTHCARE_PROFESSIONAL) {
        return !!data.userObjective;
      }
      return true;
    },
    {
      message: "Please select an option",
      path: ["userObjective"],
    }
  )
  .refine(
    (data) => {
      if (
        data.userOccupation === UserOccupations.HEALTHCARE_PROFESSIONAL &&
        data.userObjective === UserObjectives.MENTOR_OTHERS
      ) {
        return (
          data.primaryAreasOfPractice.length >= 1 &&
          data.primaryAreasOfPractice.length <= 7
        );
      }
      return true;
    },
    {
      message: "Please select 1-7 areas of practice",
      path: ["primaryAreasOfPractice"],
    }
  )
  .refine(
    (data) => {
      if (
        data.userOccupation === UserOccupations.HEALTHCARE_PROFESSIONAL &&
        data.userObjective === UserObjectives.MENTOR_OTHERS
      ) {
        return (
          data.areasOfExpertise.length >= 1 && data.areasOfExpertise.length <= 7
        );
      }
      return true;
    },
    {
      message: "Please select 1-7 areas of expertise",
      path: ["areasOfExpertise"],
    }
  )
  .refine(
    (data) => {
      if (
        (data.userOccupation === UserOccupations.HEALTHCARE_PROFESSIONAL &&
          data.userObjective === UserObjectives.FIND_A_MENTOR) ||
        data.userOccupation === UserOccupations.HEALTHCARE_STUDENT
      ) {
        return (
          data.primaryAreasOfInterest.length >= 1 &&
          data.primaryAreasOfInterest.length <= 7
        );
      }
      return true;
    },
    {
      message: "Please select 1-7 areas of interest",
      path: ["primaryAreasOfInterest"],
    }
  );

export type TOnboardingForm = z.infer<typeof OnboardingFormSchema>;
