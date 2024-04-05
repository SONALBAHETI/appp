import { Skeleton } from "@/components/ui/skeleton";

export default function UserSubscriptionPlanSkeleton() {
  return (
    <div className="border rounded-md px-5 py-4 flex items-center gap-2 w-max">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-x-2">
          <Skeleton className="w-16 h-5" />
          <Skeleton className="w-14 h-7" />
        </div>
        <div className="text-faded text-sm">
          <Skeleton className="w-32 h-3" />
        </div>
      </div>
    </div>
  );
}
