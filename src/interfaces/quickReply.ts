type TQuickReply = "schedule-appointment" | "custom";

export interface IQuickReply {
  id: string;
  user: string;
  type: TQuickReply;
  title: string;
  text: string;
  metadata: any;
  shortcut: string;
}
