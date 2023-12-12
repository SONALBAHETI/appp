import { ChannelListProvider } from "@sendbird/uikit-react/ChannelList/context";
import type { ChannelListProviderProps } from "@sendbird/uikit-react/ChannelList/context";
import { cn } from "@/lib/utils"

import ChannelListUI from "./ChannelListUI";
import "./ChannelList.css";

export default function ChannelList({ className, ...props }: ChannelListProviderProps) {
  return (
    <ChannelListProvider className={cn("rounded-lg overflow-y-auto", className)} {...props}>
      <ChannelListUI />
    </ChannelListProvider>
  );
}
