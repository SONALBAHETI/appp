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
    <div className="flex flex-col flex-grow w-full bg-transparent overflow-y-auto">
      <div className="flex flex-col flex-grow md:flex-row gap-3 overflow-y-auto">
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
                  onReject={() => setSelectedChatRequestId(null)}
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
