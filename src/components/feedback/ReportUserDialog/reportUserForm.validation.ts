import { z } from "zod";

export enum UserReportCategory {
  HARASSMENT = "harassment",
  SPAM = "spam",
  FRAUD = "fraud",
  INAPPROPRIATE_BEHAVIOUR = "inappropriate behaviour",
}

export const UserReportCategories = Object.values(UserReportCategory);

export const ReportUserFormSchema = z.object({
  category: z.string().min(1, "Please select a category."),
  reason: z.string().min(1, "Please provide a reason for your report."),
});

export type ReportUserFormSchema = z.infer<typeof ReportUserFormSchema>;
