import { z } from "zod";

export const PostalCodeSchema = z
  .string({ required_error: "Please enter postal code" })
  .min(1, {
    message: "Please enter postal code",
  })
  .regex(/^[0-9]{5}(?:-[0-9]{4})?$/, "Please enter a valid postal code");
