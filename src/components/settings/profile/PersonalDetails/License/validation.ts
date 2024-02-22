import { PostalCodeSchema } from "@/validation/common.validation";
import * as z from "zod";

const firstName = z.string().min(1, {
  message: "Please enter your first name",
});

const lastName = z.string().min(1, {
  message: "Please enter your first name",
});

const email = z
  .string()
  .min(1, {
    message: "Please enter an email.",
  })
  .email("Please enter a valid email.");

const birthDate = z.date();

const status = z.string().min(1, { message: "Please select a status" });

const organization = z
  .object({
    id: z.number(),
    name: z.string(),
  })
  .required();

export const LicenseFormSchema = z.object({
  firstName,
  lastName,
  email,
  postalCode: PostalCodeSchema,
  birthDate,
  status,
  organization,
});

export type LicenseFormSchema = z.infer<typeof LicenseFormSchema>;
