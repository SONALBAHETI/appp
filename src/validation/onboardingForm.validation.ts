import {
  USER_OCCUPATION_OPTIONS,
  UserObjectives,
  UserOccupations,
} from "@/constants/onboarding";
import { z } from "zod";

export const OnboardingFormSchema = z
  .object({
    userOccupation: z.object({
      label: z.string(),
      value: z.string(),
    }),
    userObjective: z
      .object({
        label: z.string(),
        value: z.string(),
      })
      .optional(),
    primaryAreasOfInterest: z.array(z.string()).default([]),
    primaryAreasOfPractice: z.array(z.string()).default([]),
    areasOfExpertise: z.array(z.string()).default([]),
  })
  .refine(
    (data) => {
      return !!data.userOccupation.value;
    },
    {
      message: "Please select an option",
      path: ["userOccupation"],
    }
  )
  .refine(
    (data) => {
      if (
        data.userOccupation.value === UserOccupations.HEALTHCARE_PROFESSIONAL
      ) {
        return !!data.userObjective?.value;
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
        data.userOccupation.value === UserOccupations.HEALTHCARE_PROFESSIONAL &&
        data.userObjective?.value === UserObjectives.MENTOR_OTHERS
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
        data.userOccupation.value === UserOccupations.HEALTHCARE_PROFESSIONAL &&
        data.userObjective?.value === UserObjectives.MENTOR_OTHERS
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
        (data.userOccupation.value ===
          UserOccupations.HEALTHCARE_PROFESSIONAL &&
          data.userObjective?.value === UserObjectives.FIND_A_MENTOR) ||
        data.userOccupation.value === UserOccupations.HEALTHCARE_STUDENT
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
