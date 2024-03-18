export enum INotificationStatus {
  PENDING = "pending",
  SENT = "sent",
  READ = "read",
  CLEARED = "cleared",
}

export interface INotification {
  id: string;
  receiver: string;
  title: string;
  type: string;
  description?: string;
  metadata: any;
  status: INotificationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface IGetNotificationsResponse
  extends PaginationResult<INotification> {}
