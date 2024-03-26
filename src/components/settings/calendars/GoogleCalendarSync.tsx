"use client";
import {
  useAuthorizeGoogleCalendarSyncMutation,
  useRemoveGoogleCalendarSyncMutation,
  useVerifyGoogleCalendarSyncQuery,
} from "@/api/appointmentSettings";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import Icon, { IconType } from "@/components/ui/Icon";
import Loader from "@/components/ui/Loader";
import { Button } from "@/components/ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export default function GoogleCalendarSync() {
  /* Server states and mutations */
  const verifyGoogleCalendarSyncQuery = useVerifyGoogleCalendarSyncQuery();
  const verifyGoogleCalendarSyncMutation =
    useAuthorizeGoogleCalendarSyncMutation();
  const removeGoogleCalendarSyncMutation =
    useRemoveGoogleCalendarSyncMutation();

  // Google oauth login flow with calendar access
  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        await verifyGoogleCalendarSyncMutation.mutateAsync({
          code: codeResponse.code,
        });
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.message);
        } else {
          toast.error("Couldn't authorize Google calendar sync.");
        }
      }
    },
    flow: "auth-code",
    scope: "https://www.googleapis.com/auth/calendar",
  });

  const onRemoveGoogleCalendarSync = async () => {
    try {
      await removeGoogleCalendarSyncMutation.mutateAsync(undefined);
    } catch (error) {
      toast.error("Couldn't remove Google calendar sync.");
    }
  };

  return (
    <div className="bg-secondary border rounded-lg p-4 max-w-md">
      <div className="flex flex-wrap items-center gap-4">
        {/* Google calendar Icon */}
        <div className="rounded-full p-3 bg-background border">
          <img
            className="w-6"
            src="/assets/svg/logos/google-calendar.svg"
            alt="Google calendar"
          />
        </div>
        <h6>Google calendar</h6>
        <div className="ml-auto px-2">
          {verifyGoogleCalendarSyncQuery.isPending ? (
            <Loader />
          ) : verifyGoogleCalendarSyncQuery.data?.authorized ? (
            <div className="flex items-center gap-2 text-accent-2">
              <Icon type={IconType.CHECK} /> Connected
              <ConfirmDialog
                title="Are you sure?"
                description="Syncing your google calendar will help you prevent double bookings."
                onConfirm={onRemoveGoogleCalendarSync}
                confirmBtnLabel="Disable google calendar sync"
                confirmBtnClassName="bg-transparent text-foreground border hover:bg-muted hover:text-foreground"
                cancelBtnClassName="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                asChild
              >
                <Icon
                  type={IconType.X}
                  className="rounded-full bg-background border-2 cursor-pointer p-1 text-foreground"
                />
              </ConfirmDialog>
            </div>
          ) : (
            <Button className="ml-auto w-full sm:w-max" onClick={() => login()}>
              {(verifyGoogleCalendarSyncMutation.isPending ||
                verifyGoogleCalendarSyncQuery.isFetching) && (
                <Loader className="mr-2" />
              )}
              Connect
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
