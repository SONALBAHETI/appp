"use client";

import { useNotificationsQuery } from "@/api/notifications";
import { AppointmentConfirmationNotification } from "./NotificationTypes";

export default function NotificationList() {
  const { data, isPending, isError } = useNotificationsQuery();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="p-4 max-w-screen-lg flex flex-col gap-2">
      {data.docs.map((notification) => (
        <AppointmentConfirmationNotification
          key={notification.id}
          notification={notification}
        />
      ))}
    </div>
  );
}
