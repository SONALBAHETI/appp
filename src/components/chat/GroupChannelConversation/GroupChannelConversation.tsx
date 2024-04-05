import MessageInput from "@/components/chat/MessageInput";
import ChannelHeader from "@/components/chat/ChannelHeader";
import "./group-channel-conversation.css";
import ChannelUI from "@sendbird/uikit-react/Channel/components/ChannelUI";

export default function GroupChannelConversation() {
  return (
    <ChannelUI
      renderMessageInput={() => <MessageInput />}
      renderChannelHeader={() => <ChannelHeader />}
    />
  );
}
