import { IDegree } from "@/interfaces/profile";
import DegreeCard from "./DegreeCard";
import DegreeCardSkeleton from "./DegreeCardSkeleton";

interface IDegreesListProps {
  degrees?: IDegree[];
  isLoading?: boolean;
}

export default function Degrees({ degrees, isLoading }: IDegreesListProps) {
  const hasDegrees = degrees && degrees.length > 0;
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {hasDegrees &&
          degrees.map((degree) => (
            <DegreeCard
              key={degree._id}
              name={degree.name}
              institution={degree.institution}
              dateOfCompletion={degree.dateOfCompletion}
            />
          ))}
        {isLoading &&
          Array.from({ length: 3 }).map((_, index) => (
            <DegreeCardSkeleton key={index} />
          ))}
      </div>
      {!hasDegrees && !isLoading && (
        <p className="text-center rounded-lg text-sm p-8 bg-secondary text-muted-foreground">
          No degrees added yet
        </p>
      )}
    </div>
  );
}
