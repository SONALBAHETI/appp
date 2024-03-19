"use client";

import { useUnreadNotificationsCountQuery } from "@/api/notifications";
import { cn } from "@/lib/utils";

export default function NotificationUnreadCount({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { data, isPending, isError } = useUnreadNotificationsCountQuery();

  if (isPending || isError) {
    return null;
  }

  return (
    <>
      {data.unreadCount === 0 ? null : (
        <div
          className={cn(
            "bg-destructive text-destructive-foreground rounded-full flex absolute-center text-xs font-medium aspect-square w-5",
            className
          )}
          {...props}
        >
          {data.unreadCount}
        </div>
      )}
    </>
  );
}
