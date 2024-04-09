"use client";

import ChatMenu from "@/components/chat/ChatMenu";
import "@sendbird/uikit-react/dist/index.css";
import GroupChannelConversation from "@/components/chat/GroupChannelConversation";
import { useChatStore } from "@/store/useChatStore";
import { TAB } from "@/interfaces/chat";
import ChatRequestDetail from "../ChatRequestDetail/ChatRequestDetail";
import NoChatRequestSelected from "../ChatRequestDetail/NoChatRequestSelected";
import type { GroupChannel } from "@sendbird/chat/groupChannel";
import { GroupChannelListQueryParams } from "@sendbird/chat/groupChannel";
import ChatChannelProvider from "@/providers/chat/ChatChannelProvider";
import ChatChannelListProvider from "@/providers/chat/ChatChannelListProvider";

export default function ChatView() {
  const {
    activeTab,
    setActiveTab,
    selectedChatRequestId,
    setSelectedChatRequestId,
    currentChannelUrl,
    channelSearchQuery,
    setCurrentChannelUrl,
  } = useChatStore();

  // for searching channels
  const queryParams: GroupChannelListQueryParams = {
    nicknameContainsFilter: channelSearchQuery,
  };

  const handleAcceptChatRequest = () => {
    setSelectedChatRequestId(null);
    setActiveTab(TAB.CHAT);
  };

  const onChannelSelect = (channel: GroupChannel | null) => {
    setCurrentChannelUrl(channel?.url || null);
  };

  return (
    <div className="flex flex-col flex-grow w-full bg-transparent overflow-y-auto">
      <div className="flex flex-col flex-grow md:flex-row gap-3 overflow-y-auto">
        <div className="flex flex-col gap-4 flex-shrink-0 md:w-1/3 2xl:w-1/4 bg-background p-4 rounded-xl">
          <ChatChannelListProvider
            onChannelSelect={onChannelSelect}
            queryParams={queryParams}
          >
            <ChatMenu />
          </ChatChannelListProvider>
        </div>

        <ChatChannelProvider channelUrl={currentChannelUrl}>
          <div className="flex-grow bg-background rounded-lg">
            {(activeTab === TAB.CHAT || activeTab == TAB.FAVORITES) && (
              <GroupChannelConversation />
            )}
            {activeTab === TAB.REQUESTS && (
              <>
                {selectedChatRequestId && (
                  <ChatRequestDetail
                    chatRequestId={selectedChatRequestId}
                    onAccept={handleAcceptChatRequest}
                    onReject={() => setSelectedChatRequestId(null)}
                  />
                )}
                {!selectedChatRequestId && (
                  <div className="flex h-full items-center justify-center pb-20">
                    <NoChatRequestSelected />
                  </div>
                )}
              </>
            )}
          </div>
        </ChatChannelProvider>
      </div>
    </div>
  );
}
