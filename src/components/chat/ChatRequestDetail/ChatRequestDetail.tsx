import { Button } from "@/components/ui/button";
import {
  useChatRequestQuery,
  useAcceptChatRequestMutation,
  useRejectChatRequestMutation,
} from "@/api/chat";
import { toast } from "react-toastify";
import RejectChatRequestDialog from "./RejectChatRequestDialog";
import ProfilePicture from "@/components/ui/ProfilePicture/ProfilePicture";
import { useMemo } from "react";
import { getFormattedTime } from "@/lib/date";
import ChatRequestDetailSkeleton from "./ChatRequestDetailSkeleton";
import Loader from "@/components/ui/Loader";

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
  const mutationRejectChatRequest = useRejectChatRequestMutation(chatRequestId);

  const formattedTime = useMemo(
    () =>
      data ? getFormattedTime(new Date(data?.chatRequest.updatedAt)) : null,
    [data]
  );

  const handleAccept = async () => {
    try {
      await mutationAcceptChatRequest.mutateAsync({ id: chatRequestId });
      if (onAccept) {
        onAccept();
      }
    } catch (error) {
      console.error(error);
      toast.error("Couldn't accept the chat request");
    }
  };

  const handleReject = async () => {
    try {
      await mutationRejectChatRequest.mutateAsync({ id: chatRequestId });
      if (onReject) {
        onReject();
      }
    } catch (error) {
      console.error(error);
      toast.error("Couldn't reject chat request");
    }
  };

  if (isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="px-8 py-6">
      <div className="flex flex-col gap-3">
        <h3 className="font-medium">Chat request</h3>
        {/* Avatar + View Profile */}
        <div className="flex gap-4">
          {isPending ? (
            <ChatRequestDetailSkeleton />
          ) : (
            <>
              <div>
                <ProfilePicture
                  className="w-24 h-24"
                  userName={data.chatRequest?.from?.name}
                  profilePic={data.chatRequest.from.profile?.picture}
                />
              </div>
              {/* User & request details */}
              <div className="flex-grow flex flex-col gap-1">
                {/* User name & timestamp */}
                <div className="flex justify-between">
                  <h4 className="font-bold">{data.chatRequest?.from?.name}</h4>
                  <span className="text-muted-foreground text-sm">
                    {formattedTime}
                  </span>
                </div>

                {/* User's badge */}

                {/* Message */}
                <p className="text-base leading-relaxed text-gray-600">
                  {data.chatRequest?.message}
                </p>
              </div>
            </>
          )}
        </div>
        {/* Accept/Reject button */}
        <div className="flex justify-end mt-4">
          <div className="w-full lg:w-1/2 flex gap-2 items-stretch">
            <RejectChatRequestDialog
              onConfirmReject={handleReject}
              loading={mutationRejectChatRequest.isPending}
            />
            <Button
              disabled={
                mutationAcceptChatRequest.isPending ||
                mutationRejectChatRequest.isPending
              }
              className="flex-grow"
              onClick={handleAccept}
            >
              {mutationAcceptChatRequest.isPending && <Loader />} Accept
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
