type TRunStatus =
  | "queued"
  | "in_progress"
  | "completed"
  | "requires_action"
  | "expired"
  | "cancelling"
  | "cancelled"
  | "failed";

export interface ISendChatbotMessageResponse {
  runId: string;
  status: TRunStatus;
}

export interface IGetRunStatusResponse {
  id: string;
  status: TRunStatus;
}

export interface IChatbotMessage {
  id: string;
  content: {
    text: { annotations: any[]; value: string };
    type: string;
  }[];
  role: "assistant" | "user";
}

export interface IGetMessagesResponse {
  messages: IChatbotMessage[];
}
