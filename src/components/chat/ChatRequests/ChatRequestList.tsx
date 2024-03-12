import { IChatRequest } from "@/interfaces/chat";
import ChatRequestItem from "./ChatRequestListItem";
import { useChatRequestsQuery } from "@/api/chat";
import { groupByDate } from "@/lib/date";
import { useChatStore } from "@/store/useChatStore";
import { useMemo } from "react";
import ChatRequestSkeleton from "./ChatRequestSkeleton";

export default function ChatRequestList() {
  const { data, isPending, isError } = useChatRequestsQuery();
  const { selectedChatRequestId, setSelectedChatRequestId } = useChatStore();

  const groupedData: Record<string, IChatRequest[]> = useMemo(() => {
    return data ? groupByDate(data?.chatRequests, "updatedAt") : null;
  }, [data]);

  if (isPending) {
    return (
      <div className="flex flex-col gap-1">
        {Array.from({ length: 3 }).map((_, index) => (
          <ChatRequestSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <div>
      {groupedData &&
        Object.keys(groupedData).map((date) => (
          <div key={date}>
            <p className="text-sm text-faded px-3 py-1 rounded-lg bg-muted/50 my-2">
              {date}
            </p>
            <div className="flex flex-col divide-y divide-y-muted divide">
              {groupedData[date].map((chatRequest) => (
                <ChatRequestItem
                  key={chatRequest.id}
                  learnerName={chatRequest.from?.name}
                  profilePic={chatRequest.from?.profile?.picture}
                  timestamp={chatRequest.updatedAt}
                  message={chatRequest.message}
                  isActive={chatRequest.id === selectedChatRequestId}
                  onClick={() => setSelectedChatRequestId(chatRequest.id)}
                />
              ))}
            </div>
          </div>
        ))}

      {data.chatRequests?.length === 0 && (
        <p className="text-muted-foreground text-center mt-4">
          No chat requests
        </p>
      )}
    </div>
  );
}
