import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import Icon, { IconType } from "../Icon";

interface IProfilePictureProps {
  userName?: string;
  profilePic?: string;
}

const ProfilePicture = React.forwardRef<
  React.ElementRef<typeof Avatar>,
  React.ComponentPropsWithoutRef<typeof Avatar> & IProfilePictureProps
>(({ className, userName, profilePic, ...props }, ref) => (
  <Avatar className={className} ref={ref} {...props}>
    <AvatarImage src={profilePic} alt="User profile picture" />
    <AvatarFallback>
      {userName ? userName[0] : <Icon type={IconType.USER} />}
    </AvatarFallback>
  </Avatar>
));
ProfilePicture.displayName = Avatar.displayName;

export default ProfilePicture;
