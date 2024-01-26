import { IconType } from "@/components/ui/Icon";

export interface INotificationAction {
  text: string;
  icon?: IconType;
  type: string;
  link?: string;
  action?: string;
}

export interface INotification {
  id: string;
  user?: string;
  title: string;
  type: string;
  content?: string;
  metadata: any;
  read?: boolean;
  actions: INotificationAction[];
  createdAt: string;
}

export interface IGetNotificationsResponse
  extends PaginationResult<INotification> {}
