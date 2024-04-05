import { ChannelListProvider } from "@sendbird/uikit-react/ChannelList/context";
import { GroupChannelListQueryParams } from "@sendbird/chat/groupChannel";
import type { GroupChannel } from "@sendbird/chat/groupChannel";

export default function ChatChannelListProvider(props: {
  children: React.ReactNode;
  onChannelSelect?: (channel: GroupChannel | null) => void;
  queryParams?: GroupChannelListQueryParams; // for searching channels
}) {
  return (
    <ChannelListProvider
      onChannelSelect={props.onChannelSelect}
      queries={{
        channelListQuery: props.queryParams,
      }}
    >
      <>{props.children}</>
    </ChannelListProvider>
  );
}
