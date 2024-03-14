import { Skeleton } from "@/components/ui/skeleton";

export default function UserBadgeSkeleton() {
  return (
    <div className="flex flex-col items-center gap-y-4 rounded-lg border p-4 w-80 text-center">
      <Skeleton className="w-40 h-40 rounded-md" />
      <div className="w-full flex flex-col gap-y-2 items-center">
        <Skeleton className="w-40 h-4 rounded-full" />
        <Skeleton className="w-full h-3 rounded-lg" />
        <Skeleton className="w-full h-3 rounded-lg" />
        <Skeleton className="w-3/4 h-3 rounded-lg" />
      </div>
      <Skeleton className="w-28 h-10 rounded-md" />
    </div>
  );
}
