import { Skeleton } from "@/components/ui/skeleton";

export default function ChatRequestSkeleton() {
  return (
    <div className="flex gap-3 px-4 py-4 cursor-pointer rounded-lg bg-muted">
      <Skeleton className="w-10 h-10 flex-shrink-0 rounded-full" />
      <div className="flex w-full flex-col gap-3">
        <div className="flex items-center justify-between">
          <Skeleton className="w-24 h-4" />
          <Skeleton className="w-8 h-3" />
        </div>
        <Skeleton className="w-full h-3" />
        <Skeleton className="w-full h-3" />
        <Skeleton className="w-1/2 h-3" />
      </div>
    </div>
  );
}
