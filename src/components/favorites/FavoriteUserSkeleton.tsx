import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export default function FavoriteUserSkeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center gap-3", className)} {...props}>
      {/* Profile picture */}
      <Skeleton className="w-12 h-12 rounded-full" />

      {/* Name and Occupation */}
      <div className="flex flex-col gap-2">
        <Skeleton className="w-40 h-4" />
        <Skeleton className="w-40 h-3" />
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-end flex-grow">
        <Skeleton className="w-10 h-10" />
      </div>
    </div>
  );
}
