"use client";

import dynamic from "next/dynamic";

const Chat = dynamic(() => import("@/components/chat"), {
  ssr: false,
  loading: () => <p>...</p>, // TODO: make a better loading state
});

export default function ChatPage() {
  return (
    <div className="flex max-h-screen p-6 w-full">
      <Chat />
    </div>
  );
}
