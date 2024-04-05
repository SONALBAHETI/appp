import { censorText } from "@/components/chat/GroupChannelConversation/utils";
import { ChannelProvider } from "@sendbird/uikit-react/Channel/context";

export default function ChatChannelProvider({
  children,
  channelUrl,
}: {
  children: React.ReactNode;
  channelUrl?: string | null;
}) {
  return (
    <ChannelProvider
      channelUrl={channelUrl || ""}
      onBeforeSendUserMessage={(text, quotedMessage) => {
        const censoredText = censorText(text);
        return {
          message: censoredText,
          parentMessageId: quotedMessage?.messageId,
        };
      }}
    >
      <>{children}</>
    </ChannelProvider>
  );
}
