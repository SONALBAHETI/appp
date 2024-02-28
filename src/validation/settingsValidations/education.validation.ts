import { z } from "zod";

const DegreesSchema = z
  .array(
    z.object({
      _id: z.string(),
      name: z.string().min(1),
      institution: z.string().min(1),
      dateOfCompletion: z.string(),
    }),
    {
      required_error: "Please add at least one degree",
    }
  )
  .min(1);

const CertificatesSchema = z
  .array(
    z.object({
      _id: z.string(),
      name: z.string().min(1),
      dateOfIssue: z.string(),
      expirationDate: z.string().optional(),
    }),
    {
      required_error: "Please add at least one certificate",
    }
  )
  .min(1);

export const EducationFormSchema = z
  .object({
    degrees: DegreesSchema,
    certificates: CertificatesSchema,
    isResidencyTrained: z.boolean().optional(),
    isFellowshipTrained: z.boolean().optional(),
    residencyPrograms: z.array(z.string()).default([]),
    fellowshipPrograms: z.array(z.string()).default([]),
  })
  .refine(
    (data) => {
      if (data.isResidencyTrained && data.residencyPrograms.length < 1) {
        return false;
      }
      return true;
    },
    {
      message: "Please select at least one residency program",
      path: ["residencyPrograms"],
    }
  )
  .refine(
    (data) => {
      if (data.isFellowshipTrained && data.fellowshipPrograms.length < 1) {
        return false;
      }
      return true;
    },
    {
      message: "Please select at least one fellowship program",
      path: ["fellowshipPrograms"],
    }
  );

export type EducationFormSchema = z.infer<typeof EducationFormSchema>;
