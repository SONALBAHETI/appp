export interface IFavoriteUser {
  id: string;
  favoritedBy: string;
  user: string;
  chatChannelUrl?: string;
}

export interface IGetFavoriteUsersResponse {
  favoriteUsers: IFavoriteUser[];
}

export interface ICreateFavoriteUserRequest {
  userId: string;
  chatChannelUrl: string;
}

export interface ICreateFavoriteUserResponse {
  favoriteUser: IFavoriteUser;
}

export interface IRemoveFavoriteUserResponse {
  deleted: boolean;
}

export interface IGetSingleFavoriteUserResponse {
  favoriteUser: IFavoriteUser | null;
}