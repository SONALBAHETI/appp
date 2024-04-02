import { z } from "zod";

export const AddCreditsFormSchema = z.object({
  quantity: z
    .number()
    .min(25)
    .max(500)
    .refine((value) => value % 5 === 0, {
      message: "Quantity should be a multiple of 5",
    })
    .default(25),
});

export type AddCreditsFormSchema = z.infer<typeof AddCreditsFormSchema>;