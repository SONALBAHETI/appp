import { z } from "zod";

export const DegreeFormSchema = z.object({
  degreeName: z.string().min(1, "Degree name is required"),
  universityName: z.string().min(1, "University name is required"),
  dateOfCompletion: z.date(),
});

export type DegreeFormSchema = z.infer<typeof DegreeFormSchema>;
