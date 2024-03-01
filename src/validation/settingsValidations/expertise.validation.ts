import { z } from "zod";

export const ExpertiseFormSchema = z.object({
  expertiseAreas: z
    .array(z.string())
    .min(1, "Please add at least one expertise area")
    .max(7, "You can only add up to 7 expertise areas"),
  commonlyTreatedDiagnoses: z
    .array(z.string())
    .min(1, "Please add at least one diagnosis")
    .max(7, "You can only add up to 7 diagnoses"),
  practiceAreas: z
    .array(z.string())
    .min(1, "Please add at least one area")
    .max(7, "You can only add up to 7 areas"),
  boardSpecialties: z
    .array(z.string())
    .min(1, "Please add at least one specialty")
    .max(7, "You can only add up to 7 specialties"),
  yearsInClinicalPractice: z
    .number()
    .min(0, "Experience can't be negative")
    .max(75, "Experience can't be more than 75 years")
    .default(0),
});

export type ExpertiseFormSchema = z.infer<typeof ExpertiseFormSchema>;
