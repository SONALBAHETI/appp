"use client";

import { Button } from "@/components/ui/button";
import { fetcher } from "@/lib/request";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Logout() {
  const router = useRouter();

  const onSubmit = async () => {
    try {
      const { response, result } = await fetcher("/api/v1/auth/logout", "POST");
      localStorage.removeItem("accessToken");
      if (response.ok) {
        router.push("/signin");
      } else {
        toast.error(
          result?.message || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };
  return <Button onClick={onSubmit}>Logout</Button>;
}
