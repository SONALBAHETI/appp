"use client";

import { useSubscriptionQuery } from "@/api/payment";
import Plans from ".";

export default function PlansWrapper() {
  const subscriptionQuery = useSubscriptionQuery();

  if (subscriptionQuery.isPending || subscriptionQuery.isError) {
    return null;
  }

  const { subscription } = subscriptionQuery.data;

  if (!subscription || subscription.status !== "active") {
    return <Plans />;
  }

  return null;
}
