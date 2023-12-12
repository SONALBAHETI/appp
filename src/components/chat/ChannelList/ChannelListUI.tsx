import { useChannelListContext } from "@sendbird/uikit-react/ChannelList/context";
import useSendbirdStateContext from "@sendbird/uikit-react/useSendbirdStateContext";
import ChannelPreview from "./ChannelPreview";

export default function ChannelListUI() {
  const { stores } = useSendbirdStateContext();
  const { allChannels, loading } = useChannelListContext();

  return (
    <>
      {/* TODO: Add a loading state */}
      {loading && <div>Loading...</div>}
      {allChannels?.map((channel) => (
        <ChannelPreview
          key={channel.url}
          channel={channel}
          userId={stores.userStore?.user?.userId}
        />
      ))}
      {allChannels?.map((channel) => (
        <ChannelPreview
          key={channel.url}
          channel={channel}
          userId={stores.userStore?.user?.userId}
        />
      ))}
      {allChannels?.map((channel) => (
        <ChannelPreview
          key={channel.url}
          channel={channel}
          userId={stores.userStore?.user?.userId}
        />
      ))}
      {allChannels?.map((channel) => (
        <ChannelPreview
          key={channel.url}
          channel={channel}
          userId={stores.userStore?.user?.userId}
        />
      ))}
      {allChannels?.map((channel) => (
        <ChannelPreview
          key={channel.url}
          channel={channel}
          userId={stores.userStore?.user?.userId}
        />
      ))}
      {allChannels?.map((channel) => (
        <ChannelPreview
          key={channel.url}
          channel={channel}
          userId={stores.userStore?.user?.userId}
        />
      ))}
      {allChannels?.map((channel) => (
        <ChannelPreview
          key={channel.url}
          channel={channel}
          userId={stores.userStore?.user?.userId}
        />
      ))}
      {allChannels?.map((channel) => (
        <ChannelPreview
          key={channel.url}
          channel={channel}
          userId={stores.userStore?.user?.userId}
        />
      ))}
    </>
  );
}
