"use client";
import ChatMenu from "@/components/chat/ChatMenu";
import "@sendbird/uikit-react/dist/index.css";
import GroupChannelConversation from "@/components/chat/GroupChannelConversation";
import { useChatStore } from "@/store/useChatStore";
import { TAB } from "@/interfaces/chat";
import ChatRequestDetail from "../ChatRequestDetail/ChatRequestDetail";

export default function ChatView() {
  const { activeTab, selectedChatRequestId, setSelectedChatRequestId } =
    useChatStore();
  return (
    <div className="w-full bg-transparent">
      <div className="flex flex-col md:flex-row h-full gap-3">
        <div className="flex flex-col gap-4 flex-shrink-0 md:w-1/2 lg:w-1/3 2xl:w-1/5 bg-white p-4 rounded-xl">
          <ChatMenu />
        </div>

        <div className="flex-grow bg-white rounded-lg">
          {activeTab === TAB.CHAT && <GroupChannelConversation />}
          {activeTab === TAB.REQUESTS && (
            <>
              {selectedChatRequestId && (
                <ChatRequestDetail
                  chatRequestId={selectedChatRequestId}
                  onAccept={() => setSelectedChatRequestId(null)}
                />
              )}
              {!selectedChatRequestId && <div>No chat request selected</div>}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
