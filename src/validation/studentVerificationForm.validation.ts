import { z } from "zod";

export const StudentVerificationFormSchema = z.object({
  firstName: z.string().min(1, {
    message: "Please enter your first name",
  }),
  lastName: z.string().min(1, {
    message: "Please enter your first name",
  }),
  email: z
    .string()
    .min(1, {
      message: "Please enter your email.",
    })
    .email("Please enter a valid email."),
  birthDate: z.date(),
  organization: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .required(),
});

export type StudentVerificationFormSchema = z.infer<
  typeof StudentVerificationFormSchema
>;
