import { z } from "zod";

export const PasswordResetRequestFormSchema = z.object({
  email: z
    .string()
    .min(1, "Please enter your email address")
    .email("Please enter a valid email address"),
});

export type PasswordResetRequestFormSchema = z.infer<
  typeof PasswordResetRequestFormSchema
>;
