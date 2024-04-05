"use client";

import { AppRoutes } from "@/constants/appRoutes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DefaultRoute = AppRoutes.Settings.Appointment.AppointmentSettings;

export default function AppointmentSettingsPage() {
  const router = useRouter();
  useEffect(() => {
    router.push(DefaultRoute.path);
  }, []);
  return null;
}
