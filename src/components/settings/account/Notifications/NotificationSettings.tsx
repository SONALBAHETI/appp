import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Fragment } from "react";

const notificationSettings = [
  {
    field: "newMessage",
    label: "New Message",
  },
  {
    field: "appointmentReminder",
    label: "Appointment Reminder",
  },
  {
    field: "systemUpdates",
    label: "System Updates",
  },
  {
    field: "ratingReminder",
    label: "Rating Reminder",
  },
  {
    field: "reviewReceived",
    label: "Review Received",
  },
  {
    field: "accountActivity",
    label: "Account Activity",
  },
  {
    field: "successfulReferral",
    label: "Successful Referral",
  },
  {
    field: "newBadgeReceived",
    label: "New Badge Received",
  },
  {
    field: "promotional",
    label: "Promotional",
  },
  {
    field: "reminders",
    label: "Reminders",
  },
];

export default function NotificationSettings() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Notification</TableHead>
          <TableHead>In-App</TableHead>
          <TableHead>Email</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {notificationSettings.map(({ field, label }) => (
          <Fragment key={field}>
            <TableRow>
              <TableCell className="font-medium max-w-[100px]">
                {label}
              </TableCell>
              <TableCell>
                <Switch />
              </TableCell>
              <TableCell>
                <Switch />
              </TableCell>
            </TableRow>
          </Fragment>
        ))}
      </TableBody>
    </Table>
  );
}
