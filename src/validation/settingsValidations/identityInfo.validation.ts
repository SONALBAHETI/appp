import { z } from "zod";
import { PostalCodeSchema } from "../common.validation";

const FirstNameSchema = z.string().min(1, {
  message: "First Name is required",
});

const LastNameSchema = z.string().min(1, {
  message: "Last Name is required",
});

const PronounsSchema = z.string().min(1, {
  message: "Please select a pronoun",
});

const DOBSchema = z.date({
  required_error: "Please select a date",
});

const EmailSchema = z
  .string()
  .min(1, {
    message: "Please enter an email",
  })
  .email("Please enter a valid email");

const BioSchema = z.string().min(1, {
  message: "Please tell us about yourself",
});

const StateSchema = z.string().min(1, {
  message: "Please enter a state name",
});

const GenderSchema = z.string().min(1, {
  message: "Please enter your gender",
});

const FunFactSchema = z.string().optional();

const IdentitySchema = z.string().optional();

const EthnicitySchema = z.string().optional();

const CommonIdentityFormSchema = {
  firstName: FirstNameSchema,
  lastName: LastNameSchema,
  email: EmailSchema,
  pronouns: PronounsSchema,
  gender: GenderSchema,
  dateOfBirth: DOBSchema,
  state: StateSchema,
  bio: BioSchema,
  funFact: FunFactSchema,
  personalInterests: z.array(z.string()).default([]),
  identity: IdentitySchema,
  ethnicity: EthnicitySchema,
  religiousAffiliations: z.array(z.string()).default([]),
  shareExtraDetailsForMatchmaking: z.boolean().optional().default(false),
};

export const IdentityInfoFormSchema = z.object({
  ...CommonIdentityFormSchema,
  postalCode: PostalCodeSchema,
});

export const StudentIdentityInfoFormSchema = z.object({
  ...CommonIdentityFormSchema,
});

export type IdentityInfoFormSchema = z.infer<typeof IdentityInfoFormSchema>;
export type StudentIdentityInfoFormSchema = z.infer<
  typeof StudentIdentityInfoFormSchema
>;
