import Channel from "@sendbird/uikit-react/Channel";
import MessageInput from "@/components/chat/MessageInput";
import ChannelHeader from "@/components/chat/ChannelHeader";
import { censorText } from "./utils";
import { useChatView } from "@/context/ChatViewContext";

import "./group-channel-conversation.css";

export default function GroupChannelConversation() {
  const { currentChannel } = useChatView();
  return (
    <Channel
      channelUrl={currentChannel?.url || ""}
      renderMessageInput={() => <MessageInput />}
      renderChannelHeader={() => <ChannelHeader />}
      onBeforeSendUserMessage={(text) => {
        const censoredText = censorText(text);
        return { message: censoredText };
      }}
    />
  );
}
