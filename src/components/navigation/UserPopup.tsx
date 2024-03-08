"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserProfileQuery } from "@/api/profileSettings";
import Loader from "@/components/ui/Loader";
import Icon, { IconType } from "@/components/ui/Icon";

export default function UserPopup() {
  const userProfileQuery = useUserProfileQuery();

  return (
    <Avatar className="w-12 h-12">
      <AvatarImage
        src={userProfileQuery.data?.profile.picture}
        alt="user profile picture"
      />
      <AvatarFallback className="w-16 h-16">
        {userProfileQuery.isPending ? (
          <Loader />
        ) : (
          <Icon name="user" type={IconType.USER} />
        )}
      </AvatarFallback>
    </Avatar>
  );
}
