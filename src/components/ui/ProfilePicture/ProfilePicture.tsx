import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import Icon, { IconType } from "../Icon";
import { Skeleton } from "../skeleton";
import { cn } from "@/lib/utils";

interface IProfilePictureProps {
  userName?: string;
  profilePic?: string;
  loading?: boolean;
}

const ProfilePicture = React.forwardRef<
  React.ElementRef<typeof Avatar>,
  React.ComponentPropsWithoutRef<typeof Avatar> & IProfilePictureProps
>(({ className, userName, profilePic, loading, ...props }, ref) => (
  <>
    {loading ? (
      <Skeleton className={cn("rounded-full", className)} />
    ) : (
      <Avatar className={className} ref={ref} {...props}>
        <AvatarImage src={profilePic} alt="User profile picture" />
        <AvatarFallback>
          {userName ? userName[0] : <Icon type={IconType.USER} />}
        </AvatarFallback>
      </Avatar>
    )}
  </>
));
ProfilePicture.displayName = Avatar.displayName;

export default ProfilePicture;
