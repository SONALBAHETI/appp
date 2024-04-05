"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useLogoutMutation } from "@/api/auth";
import { useQueryClient } from "@tanstack/react-query";
import { AppRoutes } from "@/constants/appRoutes";

export default function Logout() {
  const mutationLogout = useLogoutMutation();
  const router = useRouter();
  const queryClient = useQueryClient();

  const onSubmit = async () => {
    try {
      await mutationLogout.mutateAsync(undefined);
      queryClient.invalidateQueries();
      router.push(AppRoutes.Auth.Signin.path);
    } catch (error) {
      console.log(error);
      toast.error("Couldn't logout");
    }
  };
  return (
    <Button onClick={onSubmit} disabled={mutationLogout.isPending}>
      {mutationLogout.isPending && (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      )}{" "}
      Logout
    </Button>
  );
}
