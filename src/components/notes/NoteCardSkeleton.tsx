import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function NoteCardSkeleton() {
  return (
    <Card className="rounded-xl">
      <CardHeader>
        <CardTitle>
          <Skeleton className="w-full h-4 rounded-full" />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Skeleton className="w-full h-3 rounded-lg" />
        <Skeleton className="w-full h-3 rounded-lg" />
        <Skeleton className="w-3/4 h-3 rounded-lg" />
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
