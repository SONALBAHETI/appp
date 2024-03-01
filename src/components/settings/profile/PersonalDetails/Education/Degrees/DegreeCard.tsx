import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IDegree } from "@/interfaces/profile";
import { getFormattedDate } from "@/lib/date";

export default function DegreeCard({
  name,
  institution,
  dateOfCompletion,
}: Omit<IDegree, "_id">) {
  const formattedDate = getFormattedDate(new Date(dateOfCompletion), {
    year: "numeric",
  });
  return (
    <Card className="bg-secondary">
      <CardHeader className="h-full justify-between">
        <CardTitle className="text-base">{name}</CardTitle>
        <div className="text-sm">
          <p>{institution}</p>
          <p className="text-faded mt-1">{formattedDate}</p>
        </div>
      </CardHeader>
    </Card>
  );
}
