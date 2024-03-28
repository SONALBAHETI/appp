"use client";

import { useQuickRepliesQuery } from "@/api/accountSettings";
import QuickReply from ".";
import QuickReplySkeleton from "./QuickReplySkeleton";
import QuickReplyContainer from "./QuickReplyContainer";
import { IQuickReply } from "@/interfaces/quickReply";
import { cn } from "@/lib/utils";

interface IQuickReplyListProps {
  showEditButton?: boolean;
  showDeleteButton?: boolean;
  showCopyButton?: boolean;
  className?: string;
  onSelect?: (quickReply: IQuickReply) => void;
}

export default function QuickReplyList({
  showEditButton = true,
  showDeleteButton = true,
  showCopyButton = true,
  className,
  onSelect,
}: IQuickReplyListProps) {
  const quickRepliesQuery = useQuickRepliesQuery();

  if (quickRepliesQuery.isPending) {
    return (
      <div className="grid grid-cols-1 gap-4">
        {[...Array(3)].map((_, index) => (
          <QuickReplySkeleton key={index} />
        ))}
      </div>
    );
  }

  if (quickRepliesQuery.isError) {
    return (
      <QuickReplyContainer>
        <p className="text-center text-destructive my-5">
          Something went wrong.
        </p>
      </QuickReplyContainer>
    );
  }

  if (
    quickRepliesQuery.isSuccess &&
    quickRepliesQuery.data.quickReplies.length === 0
  ) {
    return (
      <QuickReplyContainer>
        <p className="text-center text-faded my-5">No quick replies yet</p>
      </QuickReplyContainer>
    );
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {quickRepliesQuery.data.quickReplies.map((quickReply) => (
        <QuickReply
          key={quickReply.id}
          quickReply={quickReply}
          showEditButton={showEditButton}
          showDeleteButton={showDeleteButton}
          showCopyButton={showCopyButton}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
