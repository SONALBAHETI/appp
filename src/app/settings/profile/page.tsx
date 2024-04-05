"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AppRoutes } from "@/constants/appRoutes";

const DefaultRoute = AppRoutes.Settings.Profile.PersonalDetails;

// redirects to personal details page
export default function ProfileSettingsPage() {
  const router = useRouter();
  useEffect(() => {
    router.push(DefaultRoute.path);
  }, []);
  return null;
}
