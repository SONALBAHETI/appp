import Channel from "@sendbird/uikit-react/Channel";
import MessageInput from "@/components/chat/MessageInput";
import ChannelHeader from "@/components/chat/ChannelHeader";
import { censorText } from "./utils";
import { useChatStore } from "@/store/useChatStore";

import "./group-channel-conversation.css";

export default function GroupChannelConversation() {
  const { currentChannelUrl } = useChatStore();
  // TODO: Replace with ChannelUI and use ChannelProvider on the parent to prevent reloading on tab change
  return (
    <Channel
      channelUrl={currentChannelUrl || ""}
      renderMessageInput={() => <MessageInput />}
      renderChannelHeader={() => <ChannelHeader />}
      onBeforeSendUserMessage={(text) => {
        const censoredText = censorText(text);
        return { message: censoredText };
      }}
    />
  );
}
