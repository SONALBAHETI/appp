import { z } from "zod";

export const CertificateFormSchema = z.object({
  name: z.string().min(1, "Certificate name is required"),
  dateOfIssue: z.date({ required_error: "Date of issue is required" }),
  expirationDate: z.date().optional(),
});

export type CertificateFormSchema = z.infer<typeof CertificateFormSchema>;
