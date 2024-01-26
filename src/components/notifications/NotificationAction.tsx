"use client";

import { INotificationAction } from "@/interfaces/notification";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import Icon from "@/components/ui/Icon";
import Link from "next/link";

const ActionWrapper = ({
  children,
  action,
}: {
  children: ReactNode;
  action: INotificationAction;
}) => {
  if (action.link) {
    return (
      <Link href={action.link}>
        <Button>{children}</Button>
      </Link>
    );
  } else {
    return <Button>{children}</Button>;
  }
};

export default function NotificationAction({
  action,
}: {
  action: INotificationAction;
}) {
  return (
    <ActionWrapper action={action}>
      {action.icon && <Icon type={action.icon} className="mr-2" />}
      {action.text}
    </ActionWrapper>
  );
}
