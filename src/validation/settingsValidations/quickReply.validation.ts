import { z } from "zod";

export const QuickReplySchema = z.object({
  title: z.string().min(1, { message: "Please enter a title" }),
  text: z.string().min(1, { message: "Please enter the reply text" }),
  shortcut: z
    .string()
    .optional()
    .refine(
      (value) => !value || /^[a-z-]+$/.test(value),
      "Shortcut can only contain small letters (a-z) and hyphens (-)"
    ),
});

export type QuickReplySchema = z.infer<typeof QuickReplySchema>;
