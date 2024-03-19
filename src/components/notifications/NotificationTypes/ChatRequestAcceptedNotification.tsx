import { INotificationComponentProps } from "@/interfaces/notification";
import { getCreatedAtRelativeTimeString } from "./utils";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NAV_ROUTES } from "@/components/navigation/routes";

export default function ChatRequestAcceptedNotification({
  notification,
}: INotificationComponentProps) {
  const createdAt = getCreatedAtRelativeTimeString(notification);
  return (
    <Card className="w-full">
      <CardContent className="py-4 px-4 w-full">
        <div className="flex items-start gap-4">
          {/* Profile image */}
          <Avatar>
            <AvatarImage
              src={notification.metadata.from?.image}
              alt="Profile Picture"
            />
            <AvatarFallback>PG</AvatarFallback>
          </Avatar>

          {/* Notification content */}
          <div className="flex flex-col gap-1">
            <p className="text-sm font-bold">{notification.title}</p>
            <p className="text-sm text-faded">{notification.description}</p>
            <p className="text-xs text-muted-foreground">{createdAt}</p>
          </div>

          {/* Action */}
          <div className="flex flex-grow flex-col gap-2 items-end">
            <Link href={NAV_ROUTES.CHAT.path}>
              <Button>Chat now</Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
