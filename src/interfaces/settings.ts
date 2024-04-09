import { IProfile } from "./profile";

export interface ISubmitIdentityInfoFormResponse {
  success: boolean;
}

export interface IUploadProfilePictureResponse {
  url: string;
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
  shareExtraDetailsForMatchmaking: boolean;
}

export interface IAddDegreeResponse {
  success: boolean;
}

export interface IAddCertificateResponse {
  success: boolean;
}
