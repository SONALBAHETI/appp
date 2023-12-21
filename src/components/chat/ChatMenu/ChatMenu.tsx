import { ChannelListProvider } from "@sendbird/uikit-react/ChannelList/context";
import type { GroupChannel } from "@sendbird/chat/groupChannel";
import { ChatRequestList } from "../ChatRequests";
import ChannelListUI from "../ChannelList/ChannelListUI";

import Tabs from "@/components/ui/Tabs";
import { Input } from "@/components/ui/input";

import {
  useChatView,
  useChatViewDispatch,
  ChatViewActionType,
} from "@/context/ChatViewContext";

import { TAB } from "../tab";
import "./chat-menu.css";

interface IChatMenuProps {
  className?: string;
}

const TAB_LIST = [TAB.CHAT, TAB.REQUESTS];

export default function ChatMenu({ className }: IChatMenuProps) {
  const { activeTab } = useChatView();
  const dispatch = useChatViewDispatch();

  const onTabChange = (tab: TAB) => {
    dispatch({ type: ChatViewActionType.CHANGED_TAB, tab });
  };

  const onChannelSelect = (channel: GroupChannel | null) => {
    dispatch({ type: ChatViewActionType.CHANGED_CHANNEL, channel });
  };

  return (
    <ChannelListProvider
      onChannelSelect={onChannelSelect}
      className={className}
    >
      <div className="flex flex-col gap-4 max-h-full">
        {/* Tabs */}
        <Tabs
          items={TAB_LIST}
          activeItem={activeTab}
          onTabChange={onTabChange}
        />
        <div className="flex items-center justify-between">
          <Input placeholder="Search chats..." />
          {/* Add Filter button */}
        </div>

        {/* Chat List | Favorites | Chat Requests */}
        <div className="overflow-y-auto">
          {activeTab === TAB.CHAT ? (
            <ChannelListUI />
          ) : activeTab === TAB.REQUESTS ? (
            <ChatRequestList />
          ) : (
            <></>
          )}
        </div>
      </div>
    </ChannelListProvider>
  );
}
