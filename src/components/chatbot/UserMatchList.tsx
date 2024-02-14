import { useUserMatchQuery } from "@/api/userMatch";
import UserMatchCardMini from "./UserMatchCardMini";
import Link from "next/link";

export default function UserMatchList({
  userMatchId,
}: {
  userMatchId: string;
}) {
  const { data, isPending, isError } = useUserMatchQuery(userMatchId);
  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Couldn't fetch mentors</div>;
  }
  return (
    <div>
      <div className="flex gap-2 flex-wrap">
        {data.userMatch.matches.slice(0, 2).map((match) => (
          <UserMatchCardMini key={match.name} match={match} />
        ))}
      </div>
      <div className="mt-2 float-right">
        {data.userMatch.matches?.length > 2 && (
          <Link
            className="underline underline-offset-2 text-faded"
            href={`/matches/${userMatchId}`}
          >
            View All
          </Link>
        )}
      </div>
    </div>
  );
}
