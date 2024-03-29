"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AppointmentSettingsPage() {
  const router = useRouter();
  useEffect(() => {
    // TODO: Change this to availability tab
    router.push("/settings/appointment/appointment-settings");
  }, []);
  return null;
}
