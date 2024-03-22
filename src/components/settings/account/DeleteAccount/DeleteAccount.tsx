"use client";

import {
  useDeactivateAccountMutation,
  useScheduleAccountDeletionMutation,
} from "@/api/accountSettings";
import { useLogoutMutation } from "@/api/auth";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import Loader from "@/components/ui/Loader";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const DeactivateAccount = () => {
  const deactivateAccountMutation = useDeactivateAccountMutation();
  const mutationLogout = useLogoutMutation();
  const queryClient = useQueryClient();
  const router = useRouter();

  const onConfirm = async () => {
    try {
      await deactivateAccountMutation.mutateAsync(undefined);
      await mutationLogout.mutateAsync(undefined);
      queryClient.invalidateQueries();
      router.push("/signin");
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <ConfirmDialog
      title="Are you sure?"
      description="Your account will be deactivated and you will be signed out. You can always log back in to reactivate your account."
      onConfirm={onConfirm}
      confirmBtnLabel="Deactivate account"
      asChild
    >
      <Button variant="outline" className="text-destructive">
        {deactivateAccountMutation.isPending && <Loader className="mr-2" />}
        Deactivate account
      </Button>
    </ConfirmDialog>
  );
};

const DeleteAccount = () => {
  const scheduleAccountDeletionMutation = useScheduleAccountDeletionMutation();
  const mutationLogout = useLogoutMutation();
  const queryClient = useQueryClient();
  const router = useRouter();

  const onConfirm = async () => {
    try {
      await scheduleAccountDeletionMutation.mutateAsync(undefined);
      await mutationLogout.mutateAsync(undefined);
      queryClient.invalidateQueries();
      router.push("/signin");
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <ConfirmDialog
      title="Are you sure?"
      description="Your account will be permanently deleted after 14 days of inactivity. If you change your mind within this period, you can log back in to reactivate your account."
      onConfirm={onConfirm}
      confirmBtnLabel="Schedule account deletion"
      asChild
    >
      <Button variant="outline" className="text-destructive">
        {scheduleAccountDeletionMutation.isPending && (
          <Loader className="mr-2" />
        )}
        Delete account
      </Button>
    </ConfirmDialog>
  );
};
export { DeactivateAccount, DeleteAccount };
