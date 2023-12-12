"use client";

import dynamic from "next/dynamic";

const Chat = dynamic(() => import("@/components/chat/ChatView"), {
  ssr: false,
  loading: () => <p>...</p>,
});

export default function ChatPage() {
  return (
    <div className="bg-gray-100 flex min-h-screen max-h-screen p-6 w-full">
      <Chat />
    </div>
  );
}
