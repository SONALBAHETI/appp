import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DegreeCardSkeleton() {
  return (
    <Card className="bg-secondary">
      <CardHeader>
        <CardTitle className="flex flex-col gap-2">
          <Skeleton className="w-full h-4 rounded-full" />
          <Skeleton className="w-1/3 h-4 rounded-full" />
        </CardTitle>
        <div className="flex flex-col gap-2 pt-3">
          <Skeleton className="w-full h-3 rounded-lg" />
          <Skeleton className="w-3/4 h-3 rounded-lg" />
        </div>
      </CardHeader>
    </Card>
  );
}
