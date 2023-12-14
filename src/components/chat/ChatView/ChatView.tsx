"use client";

import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import type { GroupChannel } from "@sendbird/chat/groupChannel";
import ChannelList from "@/components/chat/ChannelList";
import "@sendbird/uikit-react/dist/index.css";
import { useState } from "react";
import GroupChannelConversation from "../GroupChannelConversation";

export default function ChatView() {
  const [currentChannel, setCurrentChannel] = useState<GroupChannel | null>(
    null
  );
  const currentChannelUrl = currentChannel?.url || "";

  return (
    <div className="w-full bg-transparent">
      <SendbirdProvider
        // Add the two lines below.
        appId={process.env.NEXT_PUBLIC_SENDBIRD_APP_ID || ""}
        userId={process.env.NEXT_PUBLIC_SENDBIRD_USER_ID || ""}
        accessToken={process.env.NEXT_PUBLIC_SENDBIRD_ACCESS_TOKEN}
      >
        <div className="flex flex-col md:flex-row h-full gap-3">
          <div className="flex flex-col flex-shrink-0 md:1/3 lg:w-1/3 2xl:w-1/5">
            {/* <!-- Search bar --> */}
            <div className="p-2">Filters and Search</div>

            {/* <!-- Chat list --> */}
            <div className="flex-grow bg-white rounded-lg overflow-y-auto">
              {/* <!-- Chat list items --> */}
              <ChannelList onChannelSelect={setCurrentChannel} />
            </div>
          </div>

          <div className="flex-grow bg-white rounded-lg">
            {/* <!-- Chat screen --> */}
            <GroupChannelConversation channelUrl={currentChannelUrl} />
          </div>
        </div>
      </SendbirdProvider>
    </div>
  );
}
