"use client";

import { useSubscriptionQuery } from "@/api/payment";
import { getFormattedDateFromUnix } from "@/lib/date";
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
        You don't have an active subscription.
      </p>
    );
  }

  const subscription = subscriptionQuery.data.subscription;

  const endedAt = subscription.endedAt
    ? getFormattedDateFromUnix(subscription.endedAt, {
        year: "numeric",
      })
    : null;

  const cancelsAt = subscription.cancelAt
    ? getFormattedDateFromUnix(subscription.cancelAt, {
        year: "numeric",
      })
    : null;

  const renewsAt =
    !endedAt && !cancelsAt && subscription.currentPeriodEnd
      ? getFormattedDateFromUnix(subscription.currentPeriodEnd, {
          year: "numeric",
        })
      : null;

  return (
    <div className="border rounded-md px-5 py-4 flex items-center gap-2 w-max">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-x-2">
          <p className="font-bold text-lg">{subscription.name}</p>
          <div
            className={`rounded-md ${
              subscription.status === "active"
                ? "bg-primary text-primary-foreground"
                : "bg-destructive text-destructive-foreground"
            } px-2 py-1 text-xs uppercase`}
          >
            {subscription.status}
          </div>
        </div>
        <p className="text-faded text-sm">
          {renewsAt && `Renews on ${renewsAt}`}
          {endedAt && `Ended on ${endedAt}`}
          {cancelsAt && `Cancels on ${cancelsAt}`}
        </p>
      </div>
    </div>
  );
}
