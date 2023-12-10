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

const PasswordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._])[A-Za-z\d@$!%*?&._]+$/,
    "Passwords should be a combination of letters, numbers, and special characters with at least one uppercase letter, one lowercase letter, one number, and one special character"
  )
  .refine(
    (value) => !/^(12345|qwerty)$/.test(value),
    "Password cannot be a common pattern"
  );

export const SignUpFormSchema = z.object({
  firstName: FirstNameSchema,
  lastName: LastNameSchema,
  email: EmailSchema,
  password: PasswordSchema,
});

export type SignUpFormValues = z.infer<typeof SignUpFormSchema>;
