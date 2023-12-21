import { Skeleton } from "@/components/ui/skeleton";

export default function ChannelListUISkeleton({
  numberOfItems = 4,
}: {
  numberOfItems?: number;
}) {
  return (
    <div className="flex flex-col">
      {Array.from({ length: numberOfItems }).map((i, index) => (
        <div key={index} className="flex px-5 py-3 items-center gap-2">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div className="flex flex-1 flex-col gap-1">
            <Skeleton className="w-full h-4 rounded-lg" />
            <Skeleton className="w-1/2 h-4 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}
