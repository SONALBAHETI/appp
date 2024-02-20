export interface ISheerIDOrganization {
  id: number;
  idExtended: string;
  name: string;
  country: string;
  type: string;
}

export interface ISearchOrganizationsResponse {
  organizations: ISheerIDOrganization[];
}

export interface IGetOrgSearchUrlResponse {
  orgSearchUrl: string;
}

export interface ISubmitMentorVerificationDataResponse {
  verificationId: string;
  currentStep: string;
}

export interface IGetCurrentVerificationStepResponse {
  currentStep: string;
}
