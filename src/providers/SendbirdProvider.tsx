"use client";

import { SendBirdProvider } from "@sendbird/uikit-react";

export default function SendbirdProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SendBirdProvider
      appId={process.env.NEXT_PUBLIC_SENDBIRD_APP_ID || ""}
      userId={process.env.NEXT_PUBLIC_SENDBIRD_USER_ID || ""}
      accessToken={process.env.NEXT_PUBLIC_SENDBIRD_ACCESS_TOKEN}
    >
      {children}
    </SendBirdProvider>
  );
}
