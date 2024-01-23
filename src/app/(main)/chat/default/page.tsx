"use client";

import SendbirdApp from "@sendbird/uikit-react/App";
import "@sendbird/uikit-react/dist/index.css";

export default function DefaultChatPage() {
  return (
    <div className="w-full">
      <SendbirdApp
        // Add the two lines below.
        appId="B8EABEE5-BA7C-4C78-9560-2059BC76C69D" // Specify your Sendbird application ID.
        userId="sonalbaheti" // Specify your user ID.
        accessToken="89ea3572749d229806ab72ba7012a27bd67d1993"
      />
    </div>
  );
}
