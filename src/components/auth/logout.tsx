"use client";

import { Button } from "@/components/ui/button";
import { useApi } from "@/hooks/useApi";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";

export default function Logout() {
  const { removeAuth } = useAuth();
  const [logout, isLoggingOut] = useApi({
    url: "/api/v1/auth/logout",
    method: "POST",
  });
  const router = useRouter();

  const onSubmit = async () => {
    try {
      const { response, result } = await logout();
      if (response.ok) {
        removeAuth();
        router.push("/signin");
      } else {
        toast.error(
          result?.message || "Oops! Couldn't log out. Please try again."
        );
      }
    } catch (error) {}
  };
  return (
    <Button onClick={onSubmit} disabled={isLoggingOut}>
      {isLoggingOut && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Logout
    </Button>
  );
}
