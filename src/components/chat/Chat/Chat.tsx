"use client";

import SendbirdProvider from "@/providers/SendbirdProvider";
import ChatView from "../ChatView";

export default function Chat() {
  return (
    <SendbirdProvider>
      <ChatView />
    </SendbirdProvider>
  );
}
