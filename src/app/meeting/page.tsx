"use client";

import GroupCallScreen from "@/components/meeting/GroupCallScreen";
import { SbCallsProvider } from "@/lib/sendbird-calls";

export default function page() {
  return (
    <div>
      <SbCallsProvider appId={process.env.NEXT_PUBLIC_SENDBIRD_APP_ID || ""}>
        <GroupCallScreen />
      </SbCallsProvider>
    </div>
  );
}
