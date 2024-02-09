import { z } from "zod";


const DegreeSchema = z.string()

const universitySchema = z.string()

const yearOfCompletion = z.date()

export const DegreeSchemaObj = z.object({
    degreeName: DegreeSchema,
    universityName: universitySchema,
    yearOfCompletion: yearOfCompletion
})


export type DegreeFormSchema = z.infer<typeof DegreeSchemaObj>;
