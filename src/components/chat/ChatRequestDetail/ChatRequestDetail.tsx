import ButtonIcon from "@/components/ui/ButtonIcon";
import { IconType } from "@/components/ui/Icon";
import { Button } from "@/components/ui/button";
import { useChatRequestQuery, useAcceptChatRequestMutation } from "@/api/chat";
import { toast } from "react-toastify";

interface IChatRequestDetailProps {
  chatRequestId: string;
  onAccept?: () => void;
  onReject?: () => void;
}

export default function ChatRequestDetail({
  chatRequestId,
  onAccept,
  onReject,
}: IChatRequestDetailProps) {
  const { data, isPending, isError } = useChatRequestQuery(chatRequestId);
  const mutationAcceptChatRequest = useAcceptChatRequestMutation(chatRequestId);

  const handleAccept = async () => {
    try {
      await mutationAcceptChatRequest.mutateAsync({ id: chatRequestId });
      if (onAccept) {
        onAccept();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  const { chatRequest } = data;

  return (
    <div className="px-8 py-6">
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-medium">Chat request</h2>
        <div className="flex">
          {/* Avatar + View Profile */}
          <div></div>
          {/* User & request details */}
          <div className="flex-grow flex flex-col gap-1">
            {/* User name & timestamp */}
            <div className="flex justify-between">
              <h3 className="text-md font-bold">{chatRequest?.from?.name}</h3>
              <span className="text-muted-foreground text-sm">12:35 PM</span>
            </div>

            {/* User's badge */}

            {/* Message */}
            <p className="text-base leading-relaxed text-gray-600">
              {chatRequest?.message}
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
              onClick={handleAccept}
            >
              Accept
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
