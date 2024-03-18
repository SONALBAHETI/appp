"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Loader from "../ui/Loader";
import { useEffect, useState } from "react";
import { useVerifyEmailMutation } from "@/api/auth";

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const verifyEmailMutation = useVerifyEmailMutation();
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const verifyEmail = async (token: string) => {
      try {
        await verifyEmailMutation.mutateAsync({ token });
        setTimeout(() => {
          router.push(searchParams.get("redirect") || "/");
        }, 2000);
      } catch (error) {
        setError("Email verification failed. Please try again.");
      }
    };
    const token = searchParams.get("token");
    if (token) {
      verifyEmail(token);
    }
  }, [searchParams]);

  return (
    <div className="rounded-lg bg-muted text-muted-foreground border flex items-center py-5 px-6">
      {error && <p className="text-destructive">{error}</p>}
      {!error && verifyEmailMutation.isPending && (
        <>
          <Loader className="mr-2" /> Verifying email
        </>
      )}
      {!error && verifyEmailMutation.isSuccess && (
        <p>Email verified. Redirecting...</p>
      )}
    </div>
  );
}
