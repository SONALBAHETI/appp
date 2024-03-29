import GoogleCalendarSync from "@/components/settings/calendars/GoogleCalendarSync";
import GoogleAuthProvider from "@/providers/GoogleAuthProvider";

export default function CalendarSyncPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h4>Connect & sync your calendar</h4>
      </div>
      <div>
        <p className="text-faded mb-2">Add your google calendar</p>
        <GoogleAuthProvider>
          <GoogleCalendarSync />
        </GoogleAuthProvider>
      </div>
    </div>
  );
}
