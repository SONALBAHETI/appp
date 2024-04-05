import { useChannelContext } from "@sendbird/uikit-react/Channel/context";
import { generateChannelName } from "@/components/chat/utils";
import { useSendbirdStateContext } from "@sendbird/uikit-react";
import type { GroupChannel } from "@sendbird/chat/groupChannel";
import Icon from "@/components/ui/Icon";
import { IconType } from "@/components/ui/Icon/type";
import ButtonIcon from "@/components/ui/ButtonIcon";
import { useEffect, useState } from "react";
import ChannelHeaderSkeleton from "./ChannelHeaderSkeleton";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import OnlineStatus, {
  TOnlineStatus,
} from "@/components/ui/OnlineStatus/OnlineStatus";
import {
  useCreateFavoriteUserMutation,
  useRemoveFavoriteUserMutation,
  useSingleFavoriteUserQuery,
} from "@/api/user";
import { toast } from "react-toastify";
import { ISendbirdUserMetadata } from "@/interfaces/chat";

export default function ChannelHeader() {
  /* Local states */
  const [otherMemberScholarneticsId, setOtherMemberScholarneticsId] =
    useState<string>("");

  /* Sendbird states */
  const { currentGroupChannel, loading } = useChannelContext();
  const {
    stores: {
      userStore: {
        user: { userId },
      },
    },
  } = useSendbirdStateContext();

  // chatUser is the other member of the channel
  const { chatUser, channelName, channelImageUrl } = generateChannelName(
    currentGroupChannel as GroupChannel,
    userId
  );

  /* Server states */
  const otherMemberFavoriteUserQuery = useSingleFavoriteUserQuery(
    otherMemberScholarneticsId
  );
  const createFavoriteUserMutation = useCreateFavoriteUserMutation(
    otherMemberScholarneticsId
  );
  const deleteFavoriteUserMutation = useRemoveFavoriteUserMutation(
    otherMemberScholarneticsId
  );

  // online / offline status of the other member in the chat.
  const connectionStatus = chatUser?.connectionStatus as TOnlineStatus;

  const handleFavoriteToggle = async () => {
    if (
      otherMemberFavoriteUserQuery.isPending ||
      otherMemberFavoriteUserQuery.isError ||
      createFavoriteUserMutation.isPending ||
      deleteFavoriteUserMutation.isPending
    ) {
      return;
    }
    if (otherMemberScholarneticsId && currentGroupChannel) {
      try {
        if (!otherMemberFavoriteUserQuery.data?.favoriteUser) {
          await createFavoriteUserMutation.mutateAsync({
            userId: otherMemberScholarneticsId,
            chatChannelUrl: currentGroupChannel?.url,
          });
        } else {
          await deleteFavoriteUserMutation.mutateAsync(undefined);
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
  };

  useEffect(() => {
    if (currentGroupChannel) {
      currentGroupChannel.refresh();
    }
    if (chatUser) {
      const scholarneticsUserId = (chatUser.metaData as ISendbirdUserMetadata)
        .scholarnetics_user_id;
      if (scholarneticsUserId !== otherMemberScholarneticsId) {
        setOtherMemberScholarneticsId(
          (chatUser?.metaData as ISendbirdUserMetadata)?.scholarnetics_user_id
        );
      }
    } else {
      setOtherMemberScholarneticsId("");
    }
  }, [currentGroupChannel, chatUser, otherMemberScholarneticsId]);

  return (
    <ChannelHeaderSkeleton loading={loading}>
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center">
          <Avatar className="mr-4">
            <AvatarImage src={channelImageUrl} alt="User Profile Picture" />
          </Avatar>
          <div>
            <h4 className="text-md font-semibold leading-none tracking-tight">
              {channelName}
            </h4>
            <OnlineStatus status={connectionStatus} />
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Favorite button */}
          <Icon
            type={IconType.HEART}
            size={22}
            className={`cursor-pointer ${
              otherMemberFavoriteUserQuery.data?.favoriteUser
                ? "fill-destructive text-destructive"
                : ""
            }`}
            onClick={handleFavoriteToggle}
          />
          {/* More button */}
          <ButtonIcon
            variant="ghost"
            iconType={IconType.MORE_VERTICAL}
            iconSize={22}
          />
        </div>
      </div>
    </ChannelHeaderSkeleton>
  );
}
