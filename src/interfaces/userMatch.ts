export interface IMatch {
  user: string | object;
  name?: string;
  picture?: string;
  primaryRole?: string;
  numOfReviews?: number;
  yearsInClinicalPractice?: number;
  badge?: string;
  state?: string;
  responseRate?: number;
  score?: number;
}

export interface IUserMatch {
  requestedBy: string | object;
  matches: IMatch[];
  createdAt: string; // timestamp
  updatedAt: string; // timestamp
}

export interface IGetUserMatchResponse {
  userMatch: IUserMatch;
}
