import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { INotification } from "@/interfaces/notification";
import {
  getFormattedDate,
  getFormattedTime,
  getRelativeTimeString,
} from "@/lib/date";
import NotificationAction from "../NotificationAction";

export default function AppointmentConfirmationNotification({
  notification,
}: {
  notification: INotification;
}) {
  const relativeTime = getRelativeTimeString(new Date(notification.createdAt));
  const startDateStr = notification.metadata.startDate;
  const endDateStr = notification.metadata.endDate;
  const startDate = startDateStr ? new Date(startDateStr) : null;
  const endDate = endDateStr ? new Date(endDateStr) : null;

  let showDate = true,
    showTime = true;

  const startDateFormatted = startDate ? getFormattedDate(startDate) : "";
  const startTimeFormatted = startDate ? getFormattedTime(startDate) : "";
  const endTimeFormatted = endDate ? getFormattedTime(endDate) : "";

  showDate = !!startDateFormatted;
  showTime = !!startTimeFormatted && !!endTimeFormatted;

  return (
    <div className="bg-background p-4 flex gap-5 items-center rounded-md">
      <Avatar>
        <AvatarImage
          src={notification.metadata.fromImage}
          alt="Profile Picture"
        />
      </Avatar>
      <div className="flex flex-col">
        <h6>{notification.metadata.from}</h6>
        <span className="text-muted-foreground text-sm">{relativeTime}</span>
      </div>
      <p className="text-sm flex-1">{notification.title}</p>
      <div>
        {showDate && <h6>{startDateFormatted}</h6>}
        {showTime && (
          <p className="text-sm">
            {startTimeFormatted} - {endTimeFormatted}
          </p>
        )}
      </div>
      {notification.actions.map((action) => (
        <NotificationAction action={action} />
      ))}
    </div>
  );
}
