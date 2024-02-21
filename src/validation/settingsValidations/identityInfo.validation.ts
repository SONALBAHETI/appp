import { z } from "zod";

const FirstNameSchema = z.string().min(1, {
    message: "First Name is required.",
});


const LastNameSchema = z.string().min(1, {
    message: "Last Name is required.",
});


const PronounsSchema = z.string().min(1, {
    message: "Please select a pronoun.",
});

const dob = z.date()

const EmailSchema = z
    .string()
    .min(1, {
        message: "Please enter an email.",
    })
    .email("Please enter a valid email.");

const AboutSchema = z
    .string()
    .min(1, {
        message: "Please tell us about yourself.",
    })

const StateSchema = z
    .string()
    .min(1, {
        message: "Please enter a state name.",
    })

const PostalCodeSchema = z
    .number()
    .min(1, {
        message: "Please enter your postal code.",
    })


const specialitySchema = z
    .string()
    .optional()

const GenderSchema = z
    .string()
    .min(1, {
        message: "Please enter your Gender.",
    })

const FunFactSchema = z.string().optional();

const IdentitySchema = z.string().optional();

const EthnicitySchema = z.string().optional();

const ReligiousAffiliationSchema = z.string().optional();


export const PersonalDetailsFormSchema = z.object({
    firstName: FirstNameSchema,
    lastName: LastNameSchema,
    pronouns: PronounsSchema,
    year: dob,
    gender: GenderSchema,
    email: EmailSchema,
    about: AboutSchema,
    state: StateSchema,
    postalCode: PostalCodeSchema,
    funFact: FunFactSchema,
    speciality: specialitySchema,
    Identity: IdentitySchema,
    Ethnicity: EthnicitySchema,
    ReligiousAffiliation: ReligiousAffiliationSchema
});

export type PersonalDetailsValues = z.infer<typeof PersonalDetailsFormSchema>;
