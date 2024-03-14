"use client";

import ChatMenu from "@/components/chat/ChatMenu";
import "@sendbird/uikit-react/dist/index.css";
import GroupChannelConversation from "@/components/chat/GroupChannelConversation";
import { useChatStore } from "@/store/useChatStore";
import { TAB } from "@/interfaces/chat";
import ChatRequestDetail from "../ChatRequestDetail/ChatRequestDetail";
import NoChatRequestSelected from "../ChatRequestDetail/NoChatRequestSelected";

export default function ChatView() {
  const {
    activeTab,
    setActiveTab,
    selectedChatRequestId,
    setSelectedChatRequestId,
  } = useChatStore();

  const handleAcceptChatRequest = () => {
    setSelectedChatRequestId(null);
    setActiveTab(TAB.CHAT);
  };
  return (
    <div className="flex flex-col flex-grow w-full bg-transparent overflow-y-auto">
      <div className="flex flex-col flex-grow md:flex-row gap-3 overflow-y-auto">
        <div className="flex flex-col gap-4 flex-shrink-0 md:w-1/2 lg:w-1/3 2xl:w-1/4 bg-white p-4 rounded-xl">
          <ChatMenu />
        </div>

        <div className="flex-grow bg-white rounded-lg">
          {activeTab === TAB.CHAT && <GroupChannelConversation />}
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
      </div>
    </div>
  );
}
