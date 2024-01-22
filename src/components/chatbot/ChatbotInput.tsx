"use client";
import {
  getRunStatus,
  invalidateMessagesQuery,
  useSendChatbotMessageMutation,
} from "@/api/chatbot";
import { Input } from "../ui/input";
import { useRef, useState } from "react";
import { ISendChatbotMessageResponse } from "@/interfaces/chatbot";
import { useChatbotStore } from "@/store/useChatbotStore";
import { useQueryClient } from "@tanstack/react-query";
import ButtonIcon from "../ui/ButtonIcon";
import { IconType } from "../ui/Icon";
import { toast } from "react-toastify";

export default function ChatbotInput() {
  const [message, setMessage] = useState("");
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const mutationSendChatbotMessage = useSendChatbotMessageMutation();
  const { setThinking } = useChatbotStore();
  const queryClient = useQueryClient();

  // stops the interval and sets thinking to false
  const stopThinking = () => {
    const intervalId = intervalIdRef.current as NodeJS.Timeout;
    setThinking(false);
    intervalId && clearInterval(intervalId);
  };

  const resetMessage = () => {
    setMessage("");
  };

  // sends message using the sendChatbotMessage mutation
  const sendMessage = async (message: string) => {
    return (await mutationSendChatbotMessage.mutateAsync({
      message,
    })) as ISendChatbotMessageResponse;
  };

  // sends message and starts an interval to check the status of the run
  const submitMessage = async () => {
    try {
      const msg = message;
      resetMessage();
      const response = await sendMessage(msg);
      let { runId, status } = response;
      if (status === "completed") {
        invalidateMessagesQuery(queryClient);
        return;
      }
      setThinking(true);
      intervalIdRef.current = setInterval(async () => {
        try {
          const run = await getRunStatus(runId);
          runId = run.id;
          if (run.status === "completed") {
            invalidateMessagesQuery(queryClient);
            stopThinking();
          }
        } catch (error) {
          console.error(error);
          toast.error("An error occurred while fetching the message status");
          stopThinking();
        }
      }, 2500);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while sending the message");
      stopThinking();
    }
  };

  // submits message on enter
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      submitMessage();
    }
  };

  return (
    <div className="flex w-full items-center gap-2">
      <Input
        placeholder="Type your question"
        className="flex-grow"
        onKeyDown={handleKeyDown}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <ButtonIcon
        size="default"
        iconType={IconType.SEND}
        onClick={submitMessage}
      />
    </div>
  );
}
