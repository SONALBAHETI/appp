export interface IChatRequest {
  id: string;
  message?: string;
  status: "pending" | "accepted" | "rejected";
  from: {
    id: string;
    name: string;
  };
  to: {
    id: string;
    name: string;
  };
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
  REQUESTS = "requests",
}
