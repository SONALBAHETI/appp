import { Input } from "@/components/ui/input";
import { useSendbirdStateContext } from "@sendbird/uikit-react/useSendbirdStateContext";
import sendbirdSelectors from "@sendbird/uikit-react/sendbirdSelectors";
import { useEffect, useRef, useState } from "react";
import { useChannelContext } from "@sendbird/uikit-react/Channel/context";
import SBMessageInput from "@sendbird/uikit-react/Channel/components/MessageInput";
import QuoteMessageInput from "@sendbird/uikit-react/ui/QuoteMessageInput";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Icon from "@/components/ui/Icon";
import { IconType } from "@/components/ui/Icon";
import "./sb-message-input.override.css";
import QuickReplyPopup from "../QuickReply/QuickReplyPopup";
import { useChatStore } from "@/store/useChatStore";
import { useQuickRepliesQuery } from "@/api/accountSettings";

export default function MessageInput() {
  /* Local states and refs */
  const [message, setMessage] = useState<string>("");
  const fileUploadRef = useRef<HTMLInputElement>(null);

  /* Sendbird states */
  const globalStore = useSendbirdStateContext();
  const {
    currentGroupChannel,
    quoteMessage,
    setQuoteMessage,
    messageInputRef,
  } = useChannelContext();
  const sendFileMessage = sendbirdSelectors.getSendFileMessage(globalStore);

  /* Chat store */
  const { selectedQuickReply, setSelectedQuickReply } = useChatStore();

  /* Server states */
  const quickRepliesQuery = useQuickRepliesQuery();

  /* Side effects */
  useEffect(() => {
    const handleQuickReplyShortcut = () => {
      if (quickRepliesQuery.data?.quickReplies.length) {
        const { quickReplies } = quickRepliesQuery.data;
        // check if the input string is a shortcut for a quick reply
        const matchedQuickReply = quickReplies.find(
          (quickReply) =>
            quickReply.shortcut ===
            messageInputRef.current.innerText?.substring(1) // removing the forward slash at the start
        );
        if (matchedQuickReply) {
          // setting timeout so that for a brief moment, the last input character is also visible
          setTimeout(() => {
            setMessage(matchedQuickReply.text);
          }, 200);
        }
      }
    }
    // there's no onchange handler on the SBMessageInput component :(
    if (messageInputRef.current) {
      messageInputRef.current.oninput = () => {
        setMessage(messageInputRef.current.innerText);
        handleQuickReplyShortcut();
      };
    }
    return () => {
      if (messageInputRef.current) {
        messageInputRef.current.oninput = null;
      }
    };
  }, [messageInputRef.current, quickRepliesQuery.data]);

  useEffect(() => {
    if (selectedQuickReply) {
      setMessage(selectedQuickReply);
      setSelectedQuickReply("");
    }
  }, [selectedQuickReply]);

  const onFileUploadClicked = () => {
    if (fileUploadRef.current) {
      fileUploadRef.current.click();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && currentGroupChannel) {
      sendFileMessage(currentGroupChannel, { file })
        .onSucceeded((message) => {
          setMessage("");
        })
        .onFailed((error) => {
          // TODO: Handle error
          console.log(error.message);
        });
    }
  };

  return (
    // TODO: Make the height of all the elements same as this div
    <div className="flex flex-col">
      {quoteMessage && (
        <QuoteMessageInput
          className="border-t"
          replyingMessage={quoteMessage}
          onClose={() => setQuoteMessage(null)}
        />
      )}
      <div className="flex items-end px-6 gap-2">
        <Popover>
          <PopoverTrigger>
            <div className="h-14 w-14 flex flex-col items-center justify-center hover:bg-gray-100 rounded">
              <Icon type={IconType.PLUS} size={22} />
            </div>
          </PopoverTrigger>
          <PopoverContent side="top" align="start" className="p-0">
            <ul>
              <li>
                <div
                  role="button"
                  className="py-3 px-4 hover:bg-muted rounded-t-md cursor-pointer"
                  onClick={onFileUploadClicked}
                >
                  Upload a File
                  <Input
                    type="file"
                    className="hidden"
                    ref={fileUploadRef}
                    onChange={handleFileUpload}
                  />
                </div>
              </li>
              <li>
                <QuickReplyPopup asChild>
                  <div
                    role="button"
                    className="py-3 px-4 hover:bg-muted rounded-b-md cursor-pointer flex items-center gap-2"
                  >
                    <Icon
                      type={IconType.ZAP}
                      size={22}
                      className="fill-light-bulb"
                    />
                    Quick Replies
                  </div>
                </QuickReplyPopup>
              </li>
            </ul>
          </PopoverContent>
        </Popover>
        <div className="flex items-center justify-stretch flex-grow gap-2">
          <SBMessageInput value={message} renderFileUploadIcon={() => <></>} />
        </div>
      </div>
    </div>
  );
}
