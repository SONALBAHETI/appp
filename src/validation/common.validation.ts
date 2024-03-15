import { z } from "zod";

export const PostalCodeSchema = z
  .string({ required_error: "Please enter postal code" })
  .min(1, {
    message: "Please enter postal code",
  })
  .regex(/^[0-9]{5}(?:-[0-9]{4})?$/, "Please enter a valid postal code");

  export const PasswordSchema = z
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
