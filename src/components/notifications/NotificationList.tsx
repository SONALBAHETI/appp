"use client";

import {
  invalidateNotificationsCountQuery,
  useNotificationsQuery,
} from "@/api/notifications";
import { AppointmentConfirmationNotification } from "./NotificationTypes";
import ChatRequestAcceptedNotification from "./NotificationTypes/ChatRequestAcceptedNotification";
import NotificationListSkeleton from "./NotificationListSkeleton";
import { Fragment, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import NotificationListEmpty from "./NotificationListEmpty";

export default function NotificationList() {
  const {
    data,
    isPending,
    isFetchingNextPage,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useNotificationsQuery();
  const queryClient = useQueryClient();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (data) {
      // once the notifications are fetched we need to refetch the unread notifications count
      invalidateNotificationsCountQuery(queryClient);
    }
  }, [data]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isPending) {
    return <NotificationListSkeleton />;
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  if (data && data.pages[0].totalDocs === 0) {
    return <NotificationListEmpty />
  }

  return (
    <div className="max-w-xl flex flex-col gap-2">
      {data.pages.map((page) =>
        page.docs.map((notification, index) => (
          // todo: handle notification types
          <Fragment key={notification.id}>
            {index === page.docs.length - 1 ? (
              <ChatRequestAcceptedNotification
                ref={ref}
                key={notification.id}
                notification={notification}
              />
            ) : (
              <ChatRequestAcceptedNotification
                key={notification.id}
                notification={notification}
              />
            )}
          </Fragment>
        ))
      )}
      {isFetchingNextPage && <NotificationListSkeleton />}
    </div>
  );
}
