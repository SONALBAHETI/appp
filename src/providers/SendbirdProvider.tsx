"use client";

import { useChatCredentialsQuery } from "@/api/chat";
import { SendBirdProvider } from "@sendbird/uikit-react";

export default function SendbirdProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const chatCredentialsQuery = useChatCredentialsQuery();

  return (
    <SendBirdProvider
      appId={process.env.NEXT_PUBLIC_SENDBIRD_APP_ID}
      userId={chatCredentialsQuery.data?.userId || ""} /** @todo handle userId not defined */
      accessToken={chatCredentialsQuery.data?.accessToken || ""} /** @todo handle accessToken not defined */
    >
      {children}
    </SendBirdProvider>
  );
}
