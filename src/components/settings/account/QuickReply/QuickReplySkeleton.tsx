import { Skeleton } from "@/components/ui/skeleton";
import QuickReplyContainer from "./QuickReplyContainer";

export default function QuickReplySkeleton() {
  return (
    <QuickReplyContainer>
      <div className="flex justify-between gap-3">
        <div className="flex flex-grow flex-col gap-y-2">
          <Skeleton className="w-1/5 h-4 rounded-full" />
          <Skeleton className="w-3/4 h-3 rounded-full" />
          <Skeleton className="w-2/4 h-3 rounded-full" />
          <Skeleton className="w-1/6 h-3 rounded-full" />
        </div>
        <div className="flex flex-col gap-y-2">
          <Skeleton className="w-6 h-6 rounded-md" />
          <Skeleton className="w-6 h-6 rounded-md" />
        </div>
      </div>
    </QuickReplyContainer>
  );
}
