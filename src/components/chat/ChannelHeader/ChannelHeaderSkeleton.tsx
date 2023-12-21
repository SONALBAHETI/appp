import { Skeleton } from "@/components/ui/skeleton";

interface IChannelHeaderSkeletonProps {
  children: React.ReactNode;
  loading: boolean;
}

export default function ChannelHeaderSkeleton({
  children,
  loading,
}: IChannelHeaderSkeletonProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center">
          <Skeleton className="w-10 h-10 rounded-full mr-4" />
          <div className="flex flex-col gap-2">
            <Skeleton className="w-24 h-4 rounded-lg" />
            <div className="flex items-center gap-2">
              <Skeleton className="w-3 h-3 rounded-full" />
              <Skeleton className="w-12 h-3 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <>{children}</>;
  }
}
