"use client";

import GroupCallScreen from "@/components/meeting/GroupCallScreen";
import { SbCallsProvider } from "@/lib/sendbird-calls";

export default function page() {
  return (
    <div>
      <SbCallsProvider appId="88D50577-7CD1-4BC0-BF38-5AD91CE32645">
        <GroupCallScreen />
      </SbCallsProvider>
    </div>
  );
}
