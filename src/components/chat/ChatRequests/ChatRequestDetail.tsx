import { useApi } from "@/hooks/useApi";
import { useChatView } from "@/context/ChatViewContext";
import ButtonIcon from "@/components/ui/ButtonIcon";
import { IconType } from "@/components/ui/Icon";
import { Button } from "@/components/ui/button";

export default function ChatRequestDetail() {
  const { selectedChatRequest } = useChatView();
  const [acceptChatRequest, isAccepting] = useApi({
    url: "/api/v1/chats/requests/:chatRequestId/accept",
    method: "POST",
  });
  const isChatRequestSelected = selectedChatRequest !== null;
  const handleAccept = async (chatRequestId: string) => {
    try {
      const { response, result } = await acceptChatRequest({
        args: { chatRequestId },
      });
      if (response.ok) {
        // getChatRequests();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="px-8 py-6">
      {isChatRequestSelected ? (
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-medium">Chat request</h2>
          <div className="flex">
            {/* Avatar + View Profile */}
            <div></div>
            {/* User & request details */}
            <div className="flex-grow flex flex-col gap-1">
              {/* User name & timestamp */}
              <div className="flex justify-between">
                <h3 className="text-md font-bold">
                  {selectedChatRequest?.from?.name}
                </h3>
                <span className="text-muted-foreground text-sm">12:35 PM</span>
              </div>

              {/* User's badge */}

              {/* Message */}
              <p className="text-base leading-relaxed text-gray-600">
                {selectedChatRequest?.message}
              </p>
            </div>
            {/* Accept/Reject button */}
          </div>
          <div className="flex justify-end">
            <div className="w-full lg:w-1/2 flex gap-2 items-stretch">
              <ButtonIcon
                // disabled={isRejectLoading}
                className="h-12 w-12"
                iconType={IconType.X}
                variant="outline"
                iconSize={20}
                onClick={() => {}}
              />
              <Button
                // disabled={isAcceptLoading}
                className="flex-grow"
                onClick={() => {}}
              >
                Accept
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div>Chat request not selected</div>
      )}
    </div>
  );
}
