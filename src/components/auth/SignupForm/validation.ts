import { PasswordSchema } from "@/validation/common.validation";
import { z } from "zod";

const FirstNameSchema = z.string().min(1, {
  message: "First Name is required.",
});

const LastNameSchema = z.string().min(1, {
  message: "Last Name is required.",
});

const EmailSchema = z
  .string()
  .min(1, {
    message: "Please enter an email.",
  })
  .email("Please enter a valid email.");

export const SignUpForm = z.object({
  firstName: FirstNameSchema,
  lastName: LastNameSchema,
  email: EmailSchema,
  password: PasswordSchema,
});

export type SignUpForm = z.infer<typeof SignUpForm>;
