import ProfilePicture from "@/components/ui/ProfilePicture/ProfilePicture";
import { getFormattedTime } from "@/lib/date";
import { useMemo } from "react";

interface IChatRequestListItemProps {
  learnerName: string;
  profilePic?: string;
  timestamp: string;
  message?: string;
  isActive?: boolean;
  onClick?: () => void;
}

const truncateMessage = (message: string | undefined) => {
  if (message && message.length > 100) {
    return message.substring(0, 100) + "...";
  }
  return message;
};

export default function ChatRequestListItem({
  learnerName,
  profilePic,
  timestamp,
  message,
  isActive,
  onClick,
}: IChatRequestListItemProps) {
  const formattedTime = useMemo(
    () => getFormattedTime(new Date(timestamp)),
    [timestamp]
  );
  return (
    <div
      className={`flex gap-3 px-4 py-4 cursor-pointer rounded-lg ${
        isActive ? "bg-muted" : "hover:bg-muted"
      }`}
    >
      <ProfilePicture userName={learnerName} profilePic={profilePic} />
      <div className="flex flex-col" onClick={onClick} role="button">
        <div className="flex items-center justify-between">
          <span className="text-md font-bold mr-2">{learnerName}</span>
          <span className="text-sm text-faded">{formattedTime}</span>
        </div>
        <p className="text-base leading-relaxed text-gray-600 mb-2">
          {truncateMessage(message)}
        </p>
      </div>
    </div>
  );
}
