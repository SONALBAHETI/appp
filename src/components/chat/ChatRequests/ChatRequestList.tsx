import ChatRequestItem from "./ChatRequestListItem";
import { useChatRequestsQuery } from "@/api/chat";
import { useChatStore } from "@/store/useChatStore";

export default function ChatRequestList() {
  const { data, isPending, isError } = useChatRequestsQuery();
  const { selectedChatRequestId, setSelectedChatRequestId } = useChatStore();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="divide-y divide-gray-200">
      {data.chatRequests.map((chatRequest) => (
        <ChatRequestItem
          key={chatRequest.id}
          learnerName={chatRequest.from?.name}
          timestamp="12:34 PM"
          message={chatRequest.message}
          isActive={chatRequest.id === selectedChatRequestId}
          onClick={() => setSelectedChatRequestId(chatRequest.id)}
        />
      ))}
    </div>
  );
}
