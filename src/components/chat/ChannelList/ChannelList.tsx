import { ChannelListProvider } from "@sendbird/uikit-react/ChannelList/context";
import type { GroupChannel } from "@sendbird/chat/groupChannel";
import { cn } from "@/lib/utils";

import ChannelListUI from "./ChannelListUI";
import "./channel-list.css";

interface IChannelListProps {
  className?: string;
  onChannelSelect?: (channel: GroupChannel) => void;
}

export default function ChannelList({
  className,
  onChannelSelect,
}: IChannelListProps) {
  return (
    <ChannelListProvider
      onChannelSelect={onChannelSelect}
      className={cn("overflow-y-auto", className)}
    >
      <ChannelListUI />
    </ChannelListProvider>
  );
}
