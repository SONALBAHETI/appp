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

const postalCode = z
  .string()
  .min(1, {
    message: "Please enter postal code",
  })
  .regex(/^[0-9]{5}(?:-[0-9]{4})?$/, "Please enter a valid postal code");

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
  postalCode,
  birthDate,
  status,
  organization,
});

export type LicenseFormSchema = z.infer<typeof LicenseFormSchema>;