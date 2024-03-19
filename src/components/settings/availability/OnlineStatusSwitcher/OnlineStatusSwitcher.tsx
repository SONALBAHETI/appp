"use client";

import { useVisibilityMutation, useVisibilityQuery } from "@/api/user";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "react-toastify";

export default function OnlineStatusSwitcher() {
  const visibilityQuery = useVisibilityQuery();
  const visibilityMutation = useVisibilityMutation();

  const onCheckedChange = async (checked: boolean) => {
    try {
      await visibilityMutation.mutateAsync({ online: checked });
    } catch (error) {
      toast.error("Couldn't update online status.");
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <Label>Online</Label>
      <Switch
        checked={visibilityQuery.data?.online}
        onCheckedChange={onCheckedChange}
      />
    </div>
  );
}
