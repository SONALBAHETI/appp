import { z } from "zod";
import { EducationFormSchema } from "./education.validation";
import { IdentityInfoFormSchema } from "./identityInfo.validation";
import { ExpertiseFormSchema } from "./expertise.validation";
import { LicenseFormSchema } from "./license.validation";

export const ProfileSettingFormSchema = z.object({
  Education: EducationFormSchema,
  IdentityInfo: IdentityInfoFormSchema,
  Expertise: ExpertiseFormSchema,
  license: LicenseFormSchema,
});

export type TProfileSettingsForm = z.infer<typeof ProfileSettingFormSchema>;
