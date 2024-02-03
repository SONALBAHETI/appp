import *  as z from "zod"

const firstName = z.string().min(1, {
    message: "Please enter your first name"
})

const lastName = z.string().min(1, {
    message: "Please enter your first name"
})


const email = z
    .string()
    .min(1, {
        message: "Please enter an email.",
    })
    .email("Please enter a valid email.");

const postalCode = z.number().min(1, {
    message: "Please enter postal code"
})

const dateOfBirth = z.date()


export const licenseSchemaObj = z.object({
    firstName: firstName,
    lastName: lastName,
    email: email,
    postalCode: postalCode,
    dataOfBirth: dateOfBirth
})

export type LicenseSchema = z.infer<typeof licenseSchemaObj>;
