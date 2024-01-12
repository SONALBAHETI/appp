import { useChannelContext } from "@sendbird/uikit-react/Channel/context";
import { generateChannelName } from "@/components/chat/utils";
import { useSendbirdStateContext } from "@sendbird/uikit-react";
import type { GroupChannel } from "@sendbird/chat/groupChannel";
import Icon from "@/components/ui/Icon";
import { IconType } from "@/components/ui/Icon/type";
import ButtonIcon from "@/components/ui/ButtonIcon";
import { useEffect } from "react";
import ChannelHeaderSkeleton from "./ChannelHeaderSkeleton";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import OnlineStatus from "@/components/ui/OnlineStatus/OnlineStatus";

export default function ChannelHeader() {
  const { currentGroupChannel, loading } = useChannelContext();
  const {
    stores: {
      userStore: {
        user: { userId },
      },
    },
  } = useSendbirdStateContext();
  const { chatUser, channelName, channelImageUrl } = generateChannelName(
    currentGroupChannel as GroupChannel,
    userId
  );
  const connectionStatus = chatUser?.connectionStatus;

  useEffect(() => {
    if (currentGroupChannel) {
      currentGroupChannel.refresh();
    }
  }, [currentGroupChannel]);

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
          <Icon type={IconType.HEART} size={22} className="cursor-pointer" />
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
