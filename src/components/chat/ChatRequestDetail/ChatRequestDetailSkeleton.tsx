import { Skeleton } from "@/components/ui/skeleton";

export default function ChatRequestDetailSkeleton() {
  return (
    <>
      {/* Avatar + View Profile */}
      <div className="flex gap-4 w-full">
        <div>
          <Skeleton className="w-24 h-24 rounded-full" />
        </div>
        {/* User & request details */}
        <div className="flex-grow flex flex-col gap-5">
          {/* User name & timestamp */}
          <div className="flex justify-between">
            <Skeleton className="w-32 h-4" />
            <Skeleton className="w-24 h-4" />
          </div>

          {/* User's badge */}

          {/* Message */}
          <div className="flex flex-col gap-2">
            <Skeleton className="w-full h-3" />
            <Skeleton className="w-full h-3" />
            <Skeleton className="w-1/3 h-3" />
          </div>
        </div>
      </div>
    </>
  );
}
