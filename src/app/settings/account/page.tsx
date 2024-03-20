"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

// redirects to quick replies (first nav link)
export default function AccountSettingsPage() {
  const router = useRouter();
  useEffect(() => {
    router.push("/settings/account/quick-replies");
  }, []);
  return null;
}
