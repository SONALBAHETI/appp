import { IChatbotMessage } from "@/interfaces/chatbot";
import BotMessage from "./BotMessage";
import UserMessage from "./UserMessage";
import UserMatchList from "./UserMatchList";

export default function Message({
  message,
  previousMessage,
}: {
  message: IChatbotMessage;
  previousMessage?: IChatbotMessage;
}) {
  const Comp = message.role === "assistant" ? BotMessage : UserMessage;
  const userMatchId = previousMessage?.metadata?.userMatchId;
  return (
    <Comp message={message.content[0]?.text.value}>
      {userMatchId && <UserMatchList userMatchId={userMatchId} />}
    </Comp>
  );
}
