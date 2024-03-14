"use client";

import SendbirdProvider from "@/providers/SendbirdProvider";
import dynamic from "next/dynamic";

const Chat = dynamic(() => import("@/components/chat"), {
  ssr: false,
  loading: () => <p>...</p>, // TODO: make a better loading state
});

export default function ChatPage() {
  return (
    <div className="main-page main-page-fixed-height">
      <SendbirdProvider>
        <Chat />
      </SendbirdProvider>
    </div>
  );
}
