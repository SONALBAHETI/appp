import { z } from "zod";


const certificateSchema = z.string().min(1)

const issueDateSchema = z.date()

const descriptionSchema = z.string().min(1)

export const CertificateSchemaObj = z.object({
    certificateName: certificateSchema,
    issueDate: issueDateSchema,
    description: descriptionSchema
})


export type CertificateFormSchema = z.infer<typeof CertificateSchemaObj>;
