import { z } from "zod";

const FirstNameSchema = z.string().min(1, {
    message: "First Name is required.",
});


const LastNameSchema = z.string().min(1, {
    message: "First Name is required.",
});


const PronounsSchema = z.string().min(1, {
    message: "Last Name is required.",
});

const Gender = z
    .string()
    .min(1, {
        message: "Please enter an email.",
    })

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
        message: "Please about yourself.",
    })

const StateSchema = z
    .string()
    .min(1, {
        message: "Please enter  State name.",
    })

const PostalCodeSchema = z
    .number()
    .min(1, {
        message: "Please enter  Postal code.",
    })


const specialitySchema = z
    .string()
    .min(1, {
        message: "Please enter your Collage name.",
    })

const GenderSchema = z
    .string()
    .min(1, {
        message: "Please enter your Gender.",
    })

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
    speciality: specialitySchema,
});

export type PersonalDetailsValues = z.infer<typeof PersonalDetailsFormSchema>;
