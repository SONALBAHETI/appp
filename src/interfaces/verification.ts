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
  currentStep: string;
}

export interface ISubmitStudentVerificationDataResponse {
  currentStep: string;
}

export interface IDocUploadResponse {
  currentStep: string;
}

export interface IGetCurrentVerificationStepResponse {
  currentStep: string;
  maxReviewTime?: string;
  estimatedReviewTime?: string;
  rejectionReasons?: string[];
}
