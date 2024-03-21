export interface INotificationModeSettings {
  all: boolean;
  newMessage: boolean;
  appointmentReminder: boolean;
  systemUpdates: boolean;
  ratingReminder: boolean;
  reviewReceived: boolean;
  accountActivity: boolean;
  successfulReferral: boolean;
  newBadgeReceived: boolean;
  promotional: boolean;
  reminders: boolean;
}

export type INotificationType = keyof INotificationModeSettings;
export type INotificationMode = "inAppNotifications" | "emailNotifications";

export interface INotificationSettings {
  id: string;
  inAppNotifications: INotificationModeSettings;
  emailNotifications: INotificationModeSettings;
}

export interface IGetNotificationSettingsResponse {
  notificationSettings: INotificationSettings;
}