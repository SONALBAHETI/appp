/**
 * This file is used to validate environment variables during build time
 * Please do not import this file to access environment variables
 */

/** @type {import("zod")} */
const zod = require("zod");

// Just to make sure this file is not imported on the frontend
if (typeof window !== "undefined") {
  throw new Error("validateEnv.js should not be imported on the frontend");
}

/** @param {string} fieldName */
const generateMessage = (fieldName) => `${fieldName} is required`;

/** @param {string} fieldName */
const envFieldSchema = (fieldName) =>
  zod.string({ required_error: generateMessage(fieldName) }).min(1);

const EnvSchema = zod.object({
  NEXT_PUBLIC_SERVER_BASE_URL: envFieldSchema("NEXT_PUBLIC_SERVER_BASE_URL"),
  NEXT_PUBLIC_SOCKET_SERVER_URL: envFieldSchema(
    "NEXT_PUBLIC_SOCKET_SERVER_URL"
  ),
  NEXT_PUBLIC_FRONTEND_BASE_URL: envFieldSchema(
    "NEXT_PUBLIC_FRONTEND_BASE_URL"
  ),
  NEXT_PUBLIC_SENDBIRD_APP_ID: envFieldSchema("NEXT_PUBLIC_SENDBIRD_APP_ID"),
  NEXT_PUBLIC_GOOGLE_CLIENT_ID: envFieldSchema("NEXT_PUBLIC_GOOGLE_CLIENT_ID"),
  NEXT_PUBLIC_STRIPE_STUDENT_MONTHLY_SUBSCRIPTION_PRICE_ID: envFieldSchema(
    "NEXT_PUBLIC_STRIPE_STUDENT_MONTHLY_SUBSCRIPTION_PRICE_ID"
  ),
  NEXT_PUBLIC_STRIPE_STUDENT_ANNUAL_SUBSCRIPTION_PRICE_ID: envFieldSchema(
    "NEXT_PUBLIC_STRIPE_STUDENT_ANNUAL_SUBSCRIPTION_PRICE_ID"
  ),
  NEXT_PUBLIC_STRIPE_CLINICIAN_MONTHLY_SUBSCRIPTION_PRICE_ID: envFieldSchema(
    "NEXT_PUBLIC_STRIPE_CLINICIAN_MONTHLY_SUBSCRIPTION_PRICE_ID"
  ),
  NEXT_PUBLIC_STRIPE_CLINICIAN_ANNUAL_SUBSCRIPTION_PRICE_ID: envFieldSchema(
    "NEXT_PUBLIC_STRIPE_CLINICIAN_ANNUAL_SUBSCRIPTION_PRICE_ID"
  ),
});

// safe parse, throw error and exit process if invalid
const validatedEnv = EnvSchema.safeParse(process.env);
if (!validatedEnv.success) {
  console.error(
    "Invalid environment variables:",
    validatedEnv.error.issues.map((issue) => issue.message)
  );
  process.exit(1);
}

module.exports = validatedEnv.data;
