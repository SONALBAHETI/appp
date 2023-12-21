import { useApi } from "@/hooks/useApi";
import ChatRequestItem from "./ChatRequestListItem";
import { useEffect, useState } from "react";
import { IChatRequest } from "@/types/chat";
import {
  useChatView,
  ChatViewActionType,
  useChatViewDispatch,
} from "@/context/ChatViewContext";

export default function ChatRequestList() {
  const [chatRequests, setChatRequests] = useState<IChatRequest[]>([]);
  const [listChatRequests] = useApi({
    url: "/api/v1/chats/requests",
  });
  const { selectedChatRequest } = useChatView();
  const dispatch = useChatViewDispatch();

  const getChatRequests = async () => {
    try {
      const { response, result } = await listChatRequests();
      console.log(response, result);
      if (response.ok && result) {
        const { chatRequests } = result;
        setChatRequests(chatRequests);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChatRequestSelect = (chatRequest: IChatRequest) => {
    dispatch({ type: ChatViewActionType.SELECTED_CHAT_REQUEST, chatRequest });
  };

  useEffect(() => {
    getChatRequests();
  }, []);

  return (
    <div className="divide-y divide-gray-200">
      {chatRequests.map((chatRequest) => (
        <ChatRequestItem
          key={chatRequest.id}
          learnerName={chatRequest.from?.name}
          timestamp="12:34 PM"
          message={chatRequest.message}
          isActive={chatRequest.id === selectedChatRequest?.id}
          onClick={() => onChatRequestSelect(chatRequest)}
        />
      ))}
    </div>
  );
}
