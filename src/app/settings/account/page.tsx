"use client";

import { AppRoutes } from "@/constants/appRoutes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DefaultRoute = AppRoutes.Settings.Account.Notifications;

// redirects to quick replies (first nav link)
export default function AccountSettingsPage() {
  const router = useRouter();
  useEffect(() => {
    router.push(DefaultRoute.path);
  }, []);
  return null;
}
