import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import ChatView from "../ChatView";

export default function Chat() {
  return (
    <SendbirdProvider
      // Add the two lines below.
      appId={process.env.NEXT_PUBLIC_SENDBIRD_APP_ID || ""}
      userId={process.env.NEXT_PUBLIC_SENDBIRD_USER_ID || ""}
      accessToken={process.env.NEXT_PUBLIC_SENDBIRD_ACCESS_TOKEN}
    >
      <ChatView />
    </SendbirdProvider>
  );
}
