import { IdentityInfoFormSchema } from "@/validation/settingsValidations/identityInfo.validation";

export interface ISubmitIdentityInfoFormResponse {
  success: boolean;
}

export interface IGetUserProfileResponse {
  profile: Partial<IdentityInfoFormSchema>;
  email: string;
}
