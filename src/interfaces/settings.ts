import { IProfile } from "./profile";

export interface ISubmitIdentityInfoFormResponse {
  success: boolean;
}

export interface ISubmitEducationFormResponse {
  success: boolean;
}

export interface ISubmitExpertiseFormResponse {
  success: boolean;
}

export interface IGetUserProfileResponse {
  profile: IProfile;
  email: string;
}

export interface IAddDegreeResponse {
  success: boolean;
}

export interface IAddCertificateResponse {
  success: boolean;
}
