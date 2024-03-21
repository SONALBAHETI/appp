"use client";

import {
  useNotificationSettingsQuery,
  useUpdateNotificationSettingsMutation,
} from "@/api/accountSettings";
import Loader from "@/components/ui/Loader";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  INotificationMode,
  INotificationType,
} from "@/interfaces/notificationSettings";
import { Fragment } from "react";
import { toast } from "react-toastify";

const notificationSettings: {
  field: INotificationType;
  label: string;
}[] = [
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
  const notificationSettingsQuery = useNotificationSettingsQuery();
  const updateNotificationSettingsMutation =
    useUpdateNotificationSettingsMutation();

  if (notificationSettingsQuery.isPending) {
    return (
      <div className="absolute-center p-5">
        <Loader />
      </div>
    );
  }

  if (notificationSettingsQuery.isError) {
    return (
      <div className="absolute-center p-5 text-faded">
        Oops! Something went wrong.
      </div>
    );
  }

  const onSettingsToggle = async (
    mode: INotificationMode,
    notification: INotificationType,
    enabled: boolean
  ) => {
    try {
      await updateNotificationSettingsMutation.mutateAsync({
        mode,
        notification,
        enabled,
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to update notification settings");
    }
  };

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
              {/* In-app switch */}
              <TableCell>
                <Switch
                  checked={
                    notificationSettingsQuery.data.notificationSettings
                      .inAppNotifications[field]
                  }
                  onCheckedChange={(checked) =>
                    onSettingsToggle("inAppNotifications", field, checked)
                  }
                />
              </TableCell>
              {/* Email switch */}
              <TableCell>
                <Switch
                  checked={
                    notificationSettingsQuery.data.notificationSettings
                      .emailNotifications[field]
                  }
                  onCheckedChange={(checked) =>
                    onSettingsToggle("emailNotifications", field, checked)
                  }
                />
              </TableCell>
            </TableRow>
          </Fragment>
        ))}
      </TableBody>
    </Table>
  );
}
