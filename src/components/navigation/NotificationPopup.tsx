import NotificationList from "../notifications/NotificationList";
import NotificationUnreadCount from "../notifications/NotificationUnreadCount";
import Icon, { IconType } from "../ui/Icon";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export default function NotificationPopup() {
  return (
    <Popover>
      <PopoverTrigger>
        <div className="rounded-2xl border border-accent-foreground/80 p-[10px] hover:bg-accent relative">
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
        className="p-2 rounded-lg w-full max-w-[100vw] xxs:max-w-screen-xxs xs:max-w-screen-xs md:max-w-md main-page-fixed-height overflow-y-scroll"
      >
        {/* Notifications list */}
        <NotificationList />
      </PopoverContent>
    </Popover>
  );
}
