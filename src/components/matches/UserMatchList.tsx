"use client";

import { useUserMatchQuery } from "@/api/userMatch";
import Loader from "@/components/ui/Loader";
import UserMatchCard from "./UserMatchCard";
import { getFormattedDate } from "@/lib/date";

export default function UserMatchList({
  userMatchId,
}: {
  userMatchId: string;
}) {
  const userMatchQuery = useUserMatchQuery(userMatchId);

  if (userMatchQuery.isPending) {
    return (
      <div className="absolute-center p-4">
        <Loader />
      </div>
    );
  }

  if (userMatchQuery.isError) {
    return <div>Couldn't fetch mentors</div>;
  }

  const userMatch = userMatchQuery.data.userMatch;
  const createdAtFormattedString = userMatch.createdAt
    ? getFormattedDate(new Date(userMatch.createdAt), { year: "numeric" })
    : "";

  return (
    <div className="flex flex-col gap-3">
      <p className="text-faded">
        Found{" "}
        <b>
          {userMatch.matches.length} mentor
          {userMatch.matches.length > 1 ? "s" : ""}
        </b>{" "}
        who matched with your inquiry{" "}
        {createdAtFormattedString && `on ${createdAtFormattedString}`}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {userMatch.matches.map((match) => (
          <UserMatchCard key={match.name} match={match} />
        ))}
      </div>
    </div>
  );
}
