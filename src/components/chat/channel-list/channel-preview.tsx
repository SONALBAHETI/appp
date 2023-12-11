import type { GroupChannel } from "@sendbird/chat/groupChannel";
import type { UserMessage } from "@sendbird/chat/message";
import { getRelativeTimeString } from "@/lib/date";

const generateChannelName = (channel: GroupChannel, currentUserId: string) => {
  const members = channel.members.filter(
    (member) => member.userId !== currentUserId
  );
  return {
    channelName: members[0]?.nickname,
    channelImageUrl: members[0]?.plainProfileUrl || channel.coverUrl,
  };
};

const generateLastMessageTime = (channel: GroupChannel) => {
  const lastMessage = channel.lastMessage as UserMessage;
  const date = new Date(lastMessage.createdAt);
  let relativeTime = getRelativeTimeString(date, { style: "narrow" });
  return relativeTime;
};

const generateUnreadMessageCount = (channel: GroupChannel): string => {
  const { unreadMessageCount } = channel;
  if (unreadMessageCount > 99) {
    return "99+";
  }
  return unreadMessageCount + "";
};

export default function ChannelPreview({
  channel,
  userId,
}: {
  channel: GroupChannel;
  userId: string;
}) {
  const { channelName, channelImageUrl } = generateChannelName(channel, userId);
  const lastMessage = channel.lastMessage as UserMessage;
  const lastMessageTime = generateLastMessageTime(channel);
  const unreadMessageCount = generateUnreadMessageCount(channel);

  return (
    <div className="flex items-center p-3 hover:bg-gray-100 cursor-pointer px-5">
      <div className="flex-shrink-0 mr-4">
        <img
          className="w-12 h-12 rounded-full"
          src={channelImageUrl}
          alt="Profile Photo"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between gap-2">
          {/* Channel Name */}
          <h4 className="text-md font-semibold">{channelName}</h4>
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
          <p className="text-gray-700 text-sm">{lastMessage?.message}</p>
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
