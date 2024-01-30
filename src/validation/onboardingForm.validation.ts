import { z } from "zod";

export const OnboardingFormSchema = z.object({
  userOccupation: z.object({
    label: z.string(),
    value: z.string(),
  }),
  userObjective: z.object({
    label: z.string(),
    value: z.string(),
  }),
  primaryAreasOfInterest: z
    .array(z.string())
    .min(1, {
      message: "Please select at least 1 area of interest",
    })
    .max(7, {
      message: "You can select at most 7 areas of interest",
    })
    .default([]),
  primaryAreasOfPractice: z
    .array(z.string())
    .min(1, {
      message: "Please select at least 1 area of practice",
    })
    .max(7, {
      message: "You can select at most 7 areas of practice",
    })
    .default([]),
  areasOfExpertise: z
    .array(z.string())
    .min(1, {
      message: "Please select at least 1 area of expertise",
    })
    .max(7, {
      message: "You can select at most 7 areas of expertise",
    })
    .default([]),
});

export type TOnboardingForm = z.infer<typeof OnboardingFormSchema>;
