import { useState } from "react";

import { ChannelListProvider } from "@sendbird/uikit-react/ChannelList/context";
import type { GroupChannel } from "@sendbird/chat/groupChannel";
import { ChatRequestList } from "../ChatRequests";
import ChannelListUI from "./ChannelListUI";

import Tabs from "@/components/ui/Tabs";
import { Input } from "@/components/ui/input";

import { TAB } from "../tab";
import "./chat-menu.css";

interface IChatMenuProps {
  className?: string;
  onChannelSelect?: (channel: GroupChannel) => void;
}

const TAB_LIST = [TAB.CHAT, TAB.REQUESTS];

export default function ChatMenu({
  className,
  onChannelSelect,
}: IChatMenuProps) {
  const [selectedTab, setSelectedTab] = useState<TAB>(TAB.CHAT);

  return (
    <ChannelListProvider
      onChannelSelect={onChannelSelect}
      className={className}
    >
      <div className="flex flex-col gap-4 max-h-full">
        {/* Tabs */}
        <Tabs
          items={TAB_LIST}
          activeItem={selectedTab}
          onTabChange={setSelectedTab}
        />
        <div className="flex items-center justify-between">
          <Input placeholder="Search chats..." />
          {/* Add Filter button */}
        </div>

        {/* Chat List | Favorites | Chat Requests */}
        <div className="overflow-y-auto">
          {selectedTab === TAB.CHAT ? (
            <ChannelListUI />
          ) : selectedTab === TAB.REQUESTS ? (
            <ChatRequestList />
          ) : (
            <></>
          )}
        </div>
      </div>
    </ChannelListProvider>
  );
}
