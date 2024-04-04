"use client";

import { useSubscriptionQuery } from "@/api/payment";
import Plans from ".";
import { usePathname } from "next/navigation";
import { getFullRoute } from "@/constants/appRoutes";

export default function PlansWrapper() {
  const subscriptionQuery = useSubscriptionQuery();
  const pathname = usePathname();

  if (subscriptionQuery.isPending || subscriptionQuery.isError) {
    return null;
  }

  const returnUrl = getFullRoute(pathname);

  const { subscription } = subscriptionQuery.data;

  if (!subscription || subscription.status !== "active") {
    return <Plans successUrl={returnUrl} cancelUrl={returnUrl} />;
  }

  return null;
}
