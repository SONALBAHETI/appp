import { ChannelListProvider } from "@sendbird/uikit-react/ChannelList/context";
import { GroupChannelListQueryParams } from "@sendbird/chat/groupChannel";
import type { GroupChannel } from "@sendbird/chat/groupChannel";
import { ChatRequestList } from "../ChatRequests";
import ChannelListUI from "../ChannelList/ChannelListUI";

import Tabs from "@/components/ui/Tabs";
import { Input } from "@/components/ui/input";

import { TAB } from "../tab";
import "./chat-menu.css";
import { useChatStore } from "@/store/useChatStore";

interface IChatMenuProps {
  className?: string;
}

const TAB_LIST = [TAB.CHAT, TAB.REQUESTS];

export default function ChatMenu({ className }: IChatMenuProps) {
  const {
    activeTab,
    setActiveTab,
    setCurrentChannelUrl,
    channelSearchQuery,
    setChannelSearchQuery,
  } = useChatStore();

  // for searching channels
  const queryParams: GroupChannelListQueryParams = {
    nicknameContainsFilter: channelSearchQuery,
  };

  const onChannelSelect = (channel: GroupChannel | null) => {
    setCurrentChannelUrl(channel?.url || null);
  };

  return (
    <ChannelListProvider
      onChannelSelect={onChannelSelect}
      queries={{
        channelListQuery: queryParams, // for searching channels
      }}
      className={className}
    >
      <div className="flex flex-col gap-4 max-h-full">
        {/* Tabs */}
        <Tabs
          items={TAB_LIST}
          activeItem={activeTab}
          onTabChange={setActiveTab}
        />
        <div className="flex items-center justify-between">
          <Input
            placeholder="Search chats..."
            onChange={(e) => setChannelSearchQuery(e.target.value)}
          />
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
