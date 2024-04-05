import { IFavoriteUserPopulated } from "@/interfaces/favoriteUser";
import ProfilePicture from "@/components/ui/ProfilePicture";
import ButtonIcon from "../ui/ButtonIcon";
import { IconType } from "../ui/Icon";
import { cn } from "@/lib/utils";

interface IFavoriteUserProps extends React.HTMLAttributes<HTMLDivElement> {
  favoriteUser: IFavoriteUserPopulated;
  showChatButton?: boolean;
  onChatButtonClick?: () => void;
}

export default function FavoriteUser({
  className,
  favoriteUser,
  showChatButton,
  onChatButtonClick,
  ...props
}: IFavoriteUserProps) {
  return (
    <div className={cn("flex items-center gap-3", className)} {...props}>
      {/* Profile picture */}
      <ProfilePicture
        className="w-12 h-12"
        userName={favoriteUser.user.name}
        profilePic={favoriteUser.user.profile.picture}
      />

      {/* Name and Occupation */}
      <div>
        <h6>{favoriteUser.user.name}</h6>
        <p className="text-faded text-sm">{favoriteUser.user.occupation}</p>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-end flex-grow">
        {showChatButton && (
          <ButtonIcon
            variant="accent"
            iconType={IconType.CHAT}
            onClick={onChatButtonClick}
          />
        )}
      </div>
    </div>
  );
}
