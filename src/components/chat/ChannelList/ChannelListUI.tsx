import { useChannelListContext } from "@sendbird/uikit-react/ChannelList/context";
import ChannelPreview from "./ChannelPreview";

export default function ChannelListUI() {
  const { currentChannel, currentUserId } = useChannelListContext();
  const { allChannels, loading, channelListDispatcher } =
    useChannelListContext();

  return (
    <>
      {/* TODO: Add a loading state */}
      {loading && <div>Loading...</div>}
      {allChannels?.map((channel) => (
        <ChannelPreview
          key={channel.url}
          channel={channel}
          isActive={currentChannel?.url === channel.url}
          userId={currentUserId}
          onClick={() => {
            channelListDispatcher({
              type: "SET_CURRENT_CHANNEL",
              payload: channel,
            });
          }}
        />
      ))}
    </>
  );
}
