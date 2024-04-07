import { z } from "zod";

export const SendChatRequestFormSchema = z.object({
  message: z.string().min(1, "Message is required"),
});

export type SendChatRequestFormSchema = z.infer<
  typeof SendChatRequestFormSchema
>;
