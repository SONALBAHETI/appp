"use client";

import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import ChannelList from "@/components/chat/channel-list";
import "@sendbird/uikit-react/dist/index.css";

export default function Chat() {
  return (
    <div className="w-full bg-transparent">
      <SendbirdProvider
        // Add the two lines below.
        appId={process.env.NEXT_PUBLIC_SENDBIRD_APP_ID || ""}
        userId={process.env.NEXT_PUBLIC_SENDBIRD_USER_ID || ""}
        accessToken={process.env.NEXT_PUBLIC_SENDBIRD_ACCESS_TOKEN}
      >
        <ChannelList />
      </SendbirdProvider>
    </div>
  );
}
