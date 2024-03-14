"use client";
import { useAchievementsQuery } from "@/api/user";
import UserBadgeCard from "./UserBadgeCard";
import UserBadgeSkeleton from "./UserBadgeSkeleton";

export default function UserBadgeList() {
  const { data, isPending, isError } = useAchievementsQuery();

  if (isPending) {
    return (
      <div className="flex flex-wrap gap-3">
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <UserBadgeSkeleton key={index} />
          ))}
      </div>
    );
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="flex flex-wrap gap-3">
      {data.achievements.badges?.map((badge) => (
        <UserBadgeCard key={badge.id} badge={badge} />
      ))}
    </div>
  );
}
