import { useFavoriteUsersQuery } from "@/api/user";
import FavoriteUser from "./FavoriteUser";
import { IFavoriteUserPopulated } from "@/interfaces/favoriteUser";
import FavoriteUserSkeleton from "./FavoriteUserSkeleton";
import { cn } from "@/lib/utils";

export interface IFavoriteUserListProps extends React.HTMLAttributes<HTMLDivElement> {
  onChatButtonClick?: (favoriteUser: IFavoriteUserPopulated) => void;
}

export default function FavoriteUserList({className, ...props}: IFavoriteUserListProps) {
  const favoriteUsersQuery = useFavoriteUsersQuery();

  if (favoriteUsersQuery.isPending) {
    return (
      <div className={cn("flex flex-col divide-y", className)}>
        {Array.from({ length: 3 }).map((_, index) => (
          <FavoriteUserSkeleton className="py-3" key={index} />
        ))}
      </div>
    );
  }

  if (favoriteUsersQuery.isError) {
    return (
      <div className={cn("text-center text-muted-foreground", className)}>
        Something went wrong
      </div>
    );
  }

  if (favoriteUsersQuery.data.favoriteUsers.length === 0) {
    return (
      <div className={cn("text-center text-muted-foreground", className)}>
        <p>No favorites yet</p>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col divide-y", className)}>
      {favoriteUsersQuery.data.favoriteUsers.map((user) => (
        <FavoriteUser
          className="py-3"
          favoriteUser={user}
          showChatButton={!!user.chatChannelUrl}
          onChatButtonClick={() => props.onChatButtonClick?.(user)}
        />
      ))}
    </div>
  );
}
