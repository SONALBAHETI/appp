import { ChannelListProvider } from "@sendbird/uikit-react/ChannelList/context";

import ChannelListUI from "./channel-list-ui";

export default function ChannelList() {
  return (
    <ChannelListProvider className="rounded-lg">
      <ChannelListUI />
    </ChannelListProvider>
  );
}
