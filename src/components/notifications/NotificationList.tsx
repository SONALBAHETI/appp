"use client";

import {
  invalidateNotificationsCountQuery,
  useNotificationsQuery,
} from "@/api/notifications";
import { AppointmentConfirmationNotification } from "./NotificationTypes";
import ChatRequestAcceptedNotification from "./NotificationTypes/ChatRequestAcceptedNotification";
import NotificationListSkeleton from "./NotificationListSkeleton";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export default function NotificationList() {
  const { data, isPending, isError } = useNotificationsQuery();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (data) {
      // once the notifications are fetched we need to refetch the unread notifications count
      invalidateNotificationsCountQuery(queryClient);
    }
  }, [data]);

  if (isPending) {
    return <NotificationListSkeleton />;
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="p-1 max-w-xl flex flex-col gap-2">
      {data.pages.map((page) =>
        page.docs.map((notification) => (
          // todo: handle notification types
          <ChatRequestAcceptedNotification
            key={notification.id}
            notification={notification}
          />
        ))
      )}
    </div>
  );
}
