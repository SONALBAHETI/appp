import { PasswordSchema } from "@/validation/common.validation";
import { z } from "zod";

export const PasswordResetSchema = z
  .object({
    newPassword: PasswordSchema,
    confirmPassword: PasswordSchema,
  })
  .refine(
    (data) => {
      if (data.newPassword !== data.confirmPassword) {
        return false;
      }
      return true;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
);
  
export type PasswordResetSchema = z.infer<typeof PasswordResetSchema>;
