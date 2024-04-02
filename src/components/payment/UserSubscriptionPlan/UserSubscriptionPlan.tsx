"use client";

import { useSubscriptionQuery } from "@/api/payment";
import { Skeleton } from "@/components/ui/skeleton";
import { getFormattedDate } from "@/lib/date";
import UserSubscriptionPlanSkeleton from "./UserSubscriptionPlanSkeleton";

export default function UserSubscriptionPlan() {
  const subscriptionQuery = useSubscriptionQuery();

  if (subscriptionQuery.isPending || subscriptionQuery.isFetching) {
    return <UserSubscriptionPlanSkeleton />;
  }

  if (subscriptionQuery.isError) {
    return <p className="text-faded">Something went wrong.</p>;
  }

  if (!subscriptionQuery.data.subscription) {
    return (
      <p className="text-faded">
        You don't have an active subscription. Activate a plan below to get
        started.
      </p>
    );
  }

  return (
    <div className="border rounded-md px-5 py-4 flex items-center gap-2 w-max">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-x-2">
          <p className="font-bold text-lg">
            {subscriptionQuery.data.subscription.name}
          </p>
          <div className="rounded-md bg-primary text-primary-foreground px-2 py-1 text-xs uppercase">
            Active
          </div>
        </div>
        <p className="text-faded text-sm">
          Renews{" "}
          {getFormattedDate(
            new Date(
              new Date().getTime() +
                subscriptionQuery.data.subscription.renewsAt
            ),
            {
              year: "numeric",
            }
          )}
        </p>
      </div>
    </div>
  );
}
