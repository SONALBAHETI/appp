export interface IChatRequest {
  id: string;
  message?: string;
  status: "pending" | "accepted" | "rejected";
  from: {
    id: string;
    name: string;
    profile?: {
      picture?: string;
    };
  };
  to: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IChatCredentials {
  userId?: string;
  accessToken?: string;
}

export interface IGetChatRequestResponse {
  chatRequest: IChatRequest;
}

export interface IGetChatRequestsResponse {
  chatRequests: IChatRequest[];
}

export interface IUpdateChatRequestResponse {
  chatRequest: IChatRequest;
}

export enum TAB {
  CHAT = "chat",
  FAVORITES = "favorites",
  REQUESTS = "requests",
}

export interface ISendbirdUserMetadata {
  scholarnetics_user_id: string;
}
