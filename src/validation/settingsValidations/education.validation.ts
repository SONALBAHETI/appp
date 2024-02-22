import { z } from "zod";


const DegreeSchema = z.array(z.string()).min(1, {
    message: "At least one first name is required.",
})

export const EducationFormSchema = z.object({
    degree: DegreeSchema
});

export type EducationFormSchema = z.infer<typeof EducationFormSchema>;
