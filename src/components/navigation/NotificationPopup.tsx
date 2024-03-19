import NotificationList from "../notifications/NotificationList";
import NotificationUnreadCount from "../notifications/NotificationUnreadCount";
import Icon, { IconType } from "../ui/Icon";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export default function NotificationPopup() {
  return (
    <Popover>
      <PopoverTrigger>
        <div className="rounded-full border border-accent-foreground p-[11px] hover:bg-accent relative">
          <Icon type={IconType.NOTIFICATION} />
          <div className="absolute -top-1 -right-1">
            {/* Unread count badge */}
            <NotificationUnreadCount />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="end"
        className="p-0 rounded-lg xs:w-full max-w-md"
      >
        {/* Notifications list */}
        <NotificationList />
      </PopoverContent>
    </Popover>
  );
}
