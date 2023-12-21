interface IChatRequestListItemProps {
  learnerName: string;
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
  timestamp,
  message,
  isActive,
  onClick,
}: IChatRequestListItemProps) {
  return (
    <div
      className={`flex flex-col px-3 py-6 cursor-pointer hover:bg-gray-100 ${
        isActive ? "bg-gray-100" : ""
      }`}
      onClick={onClick}
      role="button"
    >
      <div className="flex items-center">
        <span className="text-md font-bold mr-2">{learnerName}</span>
      </div>
      <p className="text-base leading-relaxed text-gray-600 mb-2">
        {truncateMessage(message)}
      </p>
    </div>
  );
}
