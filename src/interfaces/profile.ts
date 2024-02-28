export interface IDegree {
  _id: string;
  name: string;
  institution: string;
  dateOfCompletion: string;
}

export interface ICertificate {
  _id: string;
  name: string;
  dateOfIssue: string;
  expirationDate?: string;
}

export interface IEducation {
  degrees?: IDegree[];
  certificates?: ICertificate[];
  isResidencyTrained?: boolean;
  isFellowshipTrained?: boolean;
  residencyPrograms?: string[];
  fellowshipPrograms?: string[];
}

export interface IExpertise {
  yearsInClinicalPractice?: number;
  expertiseAreas?: string[];
  commonlyTreatedDiagnoses?: string[];
  boardSpecialties?: string[];
  practiceAreas?: string[];
}

export interface IProfile {
  firstName: string;
  lastName: string;
  picture?: string;
  bio?: string;
  primaryRole?: string;
  pronouns?: string;
  gender?: string;
  dateOfBirth?: string;
  state?: string;
  postalCode?: string;
  funFact?: string;
  identity?: string;
  ethnicity?: string;
  personalInterests?: string[];
  religiousAffiliations?: string[];
  education?: IEducation;
  expertise?: IExpertise;
  tags?: string[];
}
