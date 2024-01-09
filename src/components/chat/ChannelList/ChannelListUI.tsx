import { useChannelListContext } from "@sendbird/uikit-react/ChannelList/context";
import ChannelPreview from "./ChannelPreview";
import ChannelListUISkeleton from "./ChannelListUISkeleton";

enum ChannelListActionTypes {
  SET_CURRENT_CHANNEL = "SET_CURRENT_CHANNEL",
}

export default function ChannelListUI() {
  const { currentChannel, currentUserId } = useChannelListContext();
  const { allChannels, loading, channelListDispatcher } =
    useChannelListContext();

  return (
    <>
      {allChannels?.map((channel) => (
        <ChannelPreview
          key={channel.url}
          channel={channel}
          isActive={currentChannel?.url === channel.url}
          userId={currentUserId}
          onClick={() => {
            channelListDispatcher({
              type: ChannelListActionTypes.SET_CURRENT_CHANNEL,
              payload: channel,
            });
          }}
        />
      ))}
      {loading && <ChannelListUISkeleton numberOfItems={10} />}
    </>
  );
}
