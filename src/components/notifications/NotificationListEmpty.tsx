import Icon, { IconType } from "../ui/Icon";

export default function NotificationListEmpty() {
  return (
    <div className="py-12 flex flex-col text-center w-96 max-w-xl">
      <Icon type={IconType.PARTYPOPPER} className="mx-auto mb-4 text-accent-2" size={28} />
      <h5 className="text-faded">You're all caught up!</h5>
      <p className="text-muted-foreground">
        No new notifications.
      </p>
    </div>
  );
}
