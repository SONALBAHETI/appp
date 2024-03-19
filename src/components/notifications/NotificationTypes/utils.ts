import { INotification } from "@/interfaces/notification";
import { getRelativeTimeString } from "@/lib/date";

export const getCreatedAtRelativeTimeString = (notification: INotification) => {
  return getRelativeTimeString(new Date(notification.createdAt));
}