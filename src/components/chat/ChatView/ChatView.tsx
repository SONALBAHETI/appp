"use client";

import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import ChannelList from "@/components/chat/ChannelList";
import "@sendbird/uikit-react/dist/index.css";

export default function ChatView() {
  return (
    <div className="w-full bg-transparent">
      <SendbirdProvider
        // Add the two lines below.
        appId={process.env.NEXT_PUBLIC_SENDBIRD_APP_ID || ""}
        userId={process.env.NEXT_PUBLIC_SENDBIRD_USER_ID || ""}
        accessToken={process.env.NEXT_PUBLIC_SENDBIRD_ACCESS_TOKEN}
      >
        <div className="flex flex-col md:flex-row h-full">
          <div className="w-full flex flex-col md:w-1/3 2xl:w-1/5">
            {/* <!-- Search bar --> */}
            <div className="p-2">Left Header</div>

            {/* <!-- Chat list --> */}
            <div className="flex-grow overflow-y-auto">
              {/* <!-- Chat list items --> */}
              <ChannelList />
            </div>
          </div>

          <div className="flex-grow bg-gray-100">
            {/* <!-- Chat screen --> */}
          </div>
        </div>
      </SendbirdProvider>
    </div>
  );
}