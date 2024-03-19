import { Skeleton } from "../ui/skeleton";

export default function NotificationListSkeleton() {
  return (
    <div className="space-y-4 w-full p-2">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="p-4 border rounded-lg animate-pulse flex items-start gap-4"
        >
          {/* Profile pic */}
          <Skeleton className="w-12 h-12 rounded-full" />

          {/* Notification content */}
          <div className="flex flex-1 w-96 flex-col gap-1">
            <Skeleton className="w-1/2 h-4" />
            <Skeleton className="w-full h-3" />
            <Skeleton className="w-1/3 h-3" />
          </div>

          {/* Action */}
          <Skeleton className="w-20 h-8" />
        </div>
      ))}
    </div>
  );
}
