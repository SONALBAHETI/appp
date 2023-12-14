import Channel from "@sendbird/uikit-react/Channel";
import MessageInput from "@/components/chat/MessageInput";
import ChannelHeader from "@/components/chat/ChannelHeader";
import { censorText } from "./utils";

import "./group-channel-conversation.css";

interface IGroupChannelConversationProps {
  channelUrl: string;
}

export default function GroupChannelConversation({
  channelUrl,
}: IGroupChannelConversationProps) {
  return (
    <Channel
      channelUrl={channelUrl}
      renderMessageInput={() => <MessageInput />}
      renderChannelHeader={() => <ChannelHeader />}
      onBeforeSendUserMessage={(text, quotedMessage) => {
        const censoredText = censorText(text);
        return { message: censoredText };
      }}
    />
  );
}
