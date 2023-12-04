import { z } from "zod";

export const SignInFormSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Please enter an email.",
    })
    .email("Please enter a valid email."),
  password: z
    .string()
    .min(1, {
      message: "Please enter your password",
    })
    .min(3, {
      message: "Invalid password", // Password cannot be less than 3 characters
    }),
});
export type SignInFormValues = z.infer<typeof SignInFormSchema>;
