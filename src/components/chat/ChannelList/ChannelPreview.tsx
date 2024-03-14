import type { GroupChannel } from "@sendbird/chat/groupChannel";
import type { UserMessage, FileMessage } from "@sendbird/chat/message";
import { getRelativeTimeString } from "@/lib/date";
import { generateChannelName } from "@/components/chat/utils";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const generateLastMessageTime = (channel: GroupChannel) => {
  const lastMessage = channel.lastMessage as UserMessage;
  const date = new Date(lastMessage.createdAt);
  let relativeTime = getRelativeTimeString(date, { style: "narrow" });
  relativeTime = relativeTime.replace("ago", "");
  if (relativeTime.includes("sec")) {
    relativeTime = "now";
  }
  return relativeTime;
};

const generateUnreadMessageCount = (channel: GroupChannel): string => {
  const { unreadMessageCount } = channel;
  if (unreadMessageCount > 99) {
    return "99+";
  }
  return unreadMessageCount + "";
};

const generateLastMessageFormatted = (
  lastMessage: UserMessage | FileMessage
) => {
  const lastUserMessage =
    lastMessage?.messageType === "user" && (lastMessage as UserMessage);
  const lastFileMessage =
    lastMessage?.messageType === "file" && (lastMessage as FileMessage);
  let formattedMessage = "";
  // text message
  if (lastUserMessage) {
    // trim the message if it's too long
    if (lastUserMessage.message && lastUserMessage.message.length > 50) {
      formattedMessage = `${lastUserMessage.message.substring(0, 50)}...`;
    } else {
      formattedMessage = lastUserMessage.message;
    }
  }
  // file message
  else if (lastFileMessage) {
    formattedMessage = "Sent an attachment";
  }
  // other
  else {
    formattedMessage = "";
  }
  return formattedMessage;
};

interface IChannelPreviewProps {
  channel: GroupChannel;
  isActive?: boolean;
  userId: string;
  onClick?: () => void;
}

export default function ChannelPreview({
  channel,
  isActive,
  userId,
  onClick,
}: IChannelPreviewProps) {
  const { channelName, channelImageUrl } = generateChannelName(channel, userId);
  const lastMessage = channel.lastMessage as UserMessage | FileMessage;
  const lastMessageTime = generateLastMessageTime(channel);
  const unreadMessageCount = generateUnreadMessageCount(channel);
  const lastMessageFormatted = generateLastMessageFormatted(lastMessage);

  return (
    <div
      className={`${
        isActive ? "bg-muted" : ""
      } flex items-center px-5 py-3 hover:bg-muted cursor-pointer rounded-lg`}
      onClick={onClick}
    >
      <Avatar className="w-12 h-12 flex-shrink-0 mr-4">
        <AvatarImage src={channelImageUrl} alt="User Profile Picture" />
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center justify-between gap-2">
          {/* Channel Name */}
          <h6 className="font-semibold">{channelName}</h6>
          {/* Last Message Time */}
          <span
            className={`text-sm text-right ${
              unreadMessageCount !== "0" ? "text-green-800" : "text-gray-500"
            }`}
          >
            {lastMessageTime}
          </span>
        </div>
        <div className="flex items-center justify-between">
          {/* Last Message */}
          <p className="text-gray-700 text-sm max-w-[70%]">
            {lastMessageFormatted}
          </p>
          {/* Unread Message Count */}
          {unreadMessageCount !== "0" && (
            <span className="bg-green-500 text-white text-xs px-2 py-[2px] rounded-full">
              {unreadMessageCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
