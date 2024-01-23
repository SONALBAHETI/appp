"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import ChatbotHeader from "./ChatbotHeader";
import BotMessage from "./BotMessage";
import UserMessage from "./UserMessage";
import Space from "@/components/ui/space";
import ChatbotInput from "./ChatbotInput";
import { useMessages } from "@/api/chatbot";
import { useEffect, useRef } from "react";
import { useChatbotStore } from "@/store/useChatbotStore";

export default function Chatbot() {
  const { data, isPending, isError, isSuccess } = useMessages();
  const cardContentRef = useRef<HTMLDivElement>(null);
  const { thinking } = useChatbotStore();

  useEffect(() => {
    if (cardContentRef.current || thinking) {
      if (cardContentRef.current) {
        cardContentRef.current.scrollTop = cardContentRef.current.scrollHeight;
      }
    }
  }, [isSuccess, thinking, data]);

  return (
    <div className="flex flex-col flex-grow max-w-5xl mx-auto max-h-screen p-6 overflow-y-scroll w-full">
      <Card className="flex-grow overflow-y-scroll bg-muted">
        <CardHeader className="py-3 bg-background">
          <ChatbotHeader />
        </CardHeader>
        <CardContent ref={cardContentRef} className="overflow-y-scroll">
          <div className="flex flex-col gap-6">
            {/* First message should have some space at the top */}
            <Space h={8} />
            {isPending && <div>Loading...</div>}
            {isError && <div>Something went wrong</div>}
            {!isPending &&
              !isError &&
              data.messages.map((message) => (
                <div className="flex flex-col gap-2" key={message.id}>
                  {message.role === "assistant" ? (
                    <BotMessage message={message.content[0].text.value} />
                  ) : (
                    <UserMessage message={message.content[0].text.value} />
                  )}
                </div>
              ))}
            {thinking && <BotMessage message="typing..." />}
          </div>
        </CardContent>
        <CardFooter>
          <ChatbotInput />
        </CardFooter>
      </Card>
    </div>
  );
}
