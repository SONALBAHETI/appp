"use client";

import { useCreditBalanceQuery } from "@/api/payment";
import { Skeleton } from "@/components/ui/skeleton";

export default function CreditBalance() {
  const creditBalanceQuery = useCreditBalanceQuery();

  if (creditBalanceQuery.isPending || creditBalanceQuery.isFetching) {
    return (
      <div className="flex items-center gap-2">
        <Skeleton className="w-3 h-3" />
        <Skeleton className="w-14 h-3" />
      </div>
    );
  }

  if (creditBalanceQuery.isError) {
    return <p className="text-faded">Something went wrong.</p>;
  }

  return (
    <p className="text-faded">{creditBalanceQuery.data.credits} credits</p>
  );
}
