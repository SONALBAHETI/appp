"use client";

import { useQuickRepliesQuery } from "@/api/accountSettings";
import QuickReply from ".";

export default function QuickReplyList() {
  const quickRepliesQuery = useQuickRepliesQuery();

  if (quickRepliesQuery.isPending) {
    return <div>Loading</div>; // TODO: add loading skeleton
  }

  if (quickRepliesQuery.isError) {
    return <div>Error</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      {quickRepliesQuery.data.quickReplies.map((quickReply) => (
        <QuickReply key={quickReply.id} quickReply={quickReply} />
      ))}
    </div>
  );
}
