import { z } from "zod";

const FullnameSchema = z.string().min(1, {
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
    .email("Please enter a valid email.");

const YearOfExperienceSchema = z.number()
    .min(1, {
        message: "Please enter Year of Experience.",
    })


const PhoneNumberSchema = z
    .number()
    .min(1, {
        message: "Please enter an email.",
    })

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

const CountrySchema = z
    .string()
    .min(1, {
        message: "Please enter  Country name.",
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


const DegreeSchema = z
    .string()
    .min(1, {
        message: "Please enter your Degree.",
    })

const CollageSchema = z
    .string()
    .min(1, {
        message: "Please enter your Collage name.",
    })


const YearOfCompletionSchema = z
    .number()
    .min(1, {
        message: "Please enter Year of completion.",
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
    firstName: FullnameSchema,
    lastName: Gender,
    pronouns: PronounsSchema,
    year: YearOfExperienceSchema,
    phone: PhoneNumberSchema,
    gender: GenderSchema,
    email: EmailSchema,
    about: AboutSchema,
    country: CountrySchema,
    state: StateSchema,
    postalCode: PostalCodeSchema,
    degree: DegreeSchema,
    speciality: specialitySchema,
    collage: CollageSchema,
    yearOfComplition: YearOfCompletionSchema
});

export type PersonalDetailsValues = z.infer<typeof PersonalDetailsFormSchema>;
