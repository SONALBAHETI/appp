"use client";

import { useQuickRepliesQuery } from "@/api/accountSettings";
import QuickReply from ".";
import QuickReplySkeleton from "./QuickReplySkeleton";
import QuickReplyContainer from "./QuickReplyContainer";

export default function QuickReplyList() {
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
        <p className="text-center text-destructive my-5">Something went wrong.</p>
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
    <div className="flex flex-col gap-2">
      {quickRepliesQuery.data.quickReplies.map((quickReply) => (
        <QuickReply key={quickReply.id} quickReply={quickReply} />
      ))}
    </div>
  );
}
