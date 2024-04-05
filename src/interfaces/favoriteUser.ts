export interface IFavoriteUser {
  id: string;
  favoritedBy: string;
  user: string;
  chatChannelUrl?: string;
}

export interface IFavoriteUserPopulated extends Omit<IFavoriteUser, "user"> {
  user: {
    id: string;
    name: string;
    profile: {
      picture: string;
    };
    occupation: string;
  };
}

export interface IGetFavoriteUsersResponse {
  favoriteUsers: IFavoriteUserPopulated[];
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
