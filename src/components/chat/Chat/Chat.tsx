"use client";

import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import ChatView from "../ChatView";
import { useChatCredentialsQuery } from "@/api/chat";

export default function Chat() {
  const chatCredentialsQuery = useChatCredentialsQuery();

  return (
    <SendbirdProvider
      appId={process.env.NEXT_PUBLIC_SENDBIRD_APP_ID || ""}
      userId={chatCredentialsQuery.data?.userId || ""}
      accessToken={chatCredentialsQuery.data?.accessToken || ""}
    >
      <ChatView />
    </SendbirdProvider>
  );
}
