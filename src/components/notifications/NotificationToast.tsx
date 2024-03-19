import { INotification } from "@/interfaces/notification";

export default function NotificationToast({
  notification,
}: {
  notification: INotification;
}) {
  return (
    <div className="flex flex-col gap-2">
      <h4>{notification.title}</h4>
      <p>{notification.description}</p>
    </div>
  );
}
