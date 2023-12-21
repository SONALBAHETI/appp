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
