
import { z } from "zod";
import { EducationFormSchemaObj } from './education.validation';
import { PersonalDetailsFormSchema } from "./IdentityInfo.validation";
import { expertiseFormSchemaObj } from "./expertise.validation";
import { licenseSchemaObj } from "./license.validation";

export const ProfileSettingFormSchema = z
    .object({
        Education: EducationFormSchemaObj,
        IdentityInfo: PersonalDetailsFormSchema,
        Expertise: expertiseFormSchemaObj,
        license: licenseSchemaObj
    })

export type TProfileSettingForm = z.infer<typeof ProfileSettingFormSchema>;
