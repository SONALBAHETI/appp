import { Input } from "@/components/ui/input";
import { useSendbirdStateContext } from "@sendbird/uikit-react/useSendbirdStateContext";
import sendbirdSelectors from "@sendbird/uikit-react/sendbirdSelectors";
import { useRef, useState } from "react";
import { useChannelContext } from "@sendbird/uikit-react/Channel/context";
import SBMessageInput from "@sendbird/uikit-react/Channel/components/MessageInput";
import QuoteMessageInput from "@sendbird/uikit-react/ui/QuoteMessageInput";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Icon from "@/components/ui/Icon";
import "./sb-message-input.override.css";

export default function MessageInput() {
  const [message, setMessage] = useState<string>("");
  const globalStore = useSendbirdStateContext();
  const { currentGroupChannel, quoteMessage, setQuoteMessage } =
    useChannelContext();
  const sendFileMessage = sendbirdSelectors.getSendFileMessage(globalStore);
  const fileUploadRef = useRef<HTMLInputElement>(null);

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
          replyingMessage={quoteMessage}
          onClose={() => setQuoteMessage(null)}
        />
      )}
      <div className="flex items-end px-6 gap-2">
        <Popover>
          <PopoverTrigger>
            <div className="h-14 w-14 flex flex-col items-center justify-center hover:bg-gray-100 rounded">
              <Icon type="Plus" size={22} />
            </div>
          </PopoverTrigger>
          <PopoverContent side="top" align="start" className="p-0">
            <ul>
              <li>
                <div
                  className="py-3 px-4 hover:bg-gray-100 rounded-t-md cursor-pointer"
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
                <div className="py-3 px-4 hover:bg-gray-100 rounded-b-md cursor-pointer">
                  Quick Replies
                </div>
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
