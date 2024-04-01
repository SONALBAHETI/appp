import { Permission, Role } from "@/constants/user";

export interface IUserBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAchievements {
  badges?: IUserBadge[];
}

export interface IGetAchievementsResponse {
  achievements: IAchievements;
}

export interface IGetVisibilityResponse {
  online: boolean;
}

export interface IGetRightsResponse {
  rights: Permission[];
  role: Role;
}
