"use client";

import { useChatCredentialsQuery } from "@/api/chat";
import { SendBirdProvider } from "@sendbird/uikit-react";

const sendbirdColorSet = {
  "--sendbird-light-primary-400": "#4b8958",
  "--sendbird-light-primary-300": "hsl(var(--primary))",
  "--sendbird-light-primary-100": "hsl(var(--accent-2-light))",
  "--sendbird-light-ondark-02": "hsl(var(--muted-foreground))",
  "--sendbird-light-information-100": "hsl(var(--primary))",
  "--sendbird-iconbutton-color": "hsl(var(--primary))",
  "--sendbird-message-input-border-active": "hsl(var(--primary))",
  "--sendbird-light-error-400": "#d53b3b",
  "--sendbird-light-error-300": "hsl(var(--destructive))",
};

export default function SendbirdProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const chatCredentialsQuery = useChatCredentialsQuery();

  return (
    <SendBirdProvider
      appId={process.env.NEXT_PUBLIC_SENDBIRD_APP_ID}
      userId={
        chatCredentialsQuery.data?.userId || ""
      } /** @todo handle userId not defined */
      accessToken={
        chatCredentialsQuery.data?.accessToken || ""
      } /** @todo handle accessToken not defined */
      colorSet={sendbirdColorSet}
    >
      {children}
    </SendBirdProvider>
  );
}
