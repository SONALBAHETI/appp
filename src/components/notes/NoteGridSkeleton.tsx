import NoteCardSkeleton from "./NoteCardSkeleton";

export default function NoteGridSkeleton({
  numberOfItems = 6,
}: {
  numberOfItems?: number;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: numberOfItems }).map((_, index) => (
        <NoteCardSkeleton key={index} />
      ))}
    </div>
  );
}
