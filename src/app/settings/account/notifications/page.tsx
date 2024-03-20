import NotificationSettings from "@/components/settings/account/Notifications";

export default function NotificationSettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h4>Notifications</h4>
        <p className="text-faded">
          Customize your notifications settings.
        </p>
      </div>
      <NotificationSettings />
    </div>
  )
}