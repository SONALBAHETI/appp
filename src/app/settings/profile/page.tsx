"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

// redirects to personal details page (first nav link)
export default function ProfileSettingsPage() {
  const router = useRouter();
  useEffect(() => {
    router.push("/settings/profile/personal-details");
  }, []);
  return null;
}
