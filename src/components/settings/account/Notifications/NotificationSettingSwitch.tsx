"use client";

import { Switch } from "@/components/ui/switch";
import React from "react";

interface INotificationSettingSwitchProps { }

const NotificationSettingSwitch = React.forwardRef<
  React.ElementRef<typeof Switch>,
  React.ComponentPropsWithoutRef<typeof Switch> &
    INotificationSettingSwitchProps
>(({ ...props }, ref) => {
  return (
    <div className="flex items-center gap-x-2">
      <Switch ref={ref} {...props} />
    </div>
  );
});

export default NotificationSettingSwitch;
