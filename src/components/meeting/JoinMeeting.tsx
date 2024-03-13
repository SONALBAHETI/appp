"use client";

import { useAppointmentQuery } from "@/api/appointment";
import GroupCallScreen from "@/components/meeting/GroupCallScreen";
import MeetingInfo from "@/components/meeting/MeetingInfo";
import VideoCam from "@/components/meeting/VideoCam";
import Icon, { IconType } from "@/components/ui/Icon";
import { Button } from "@/components/ui/button";
import { SbCallsProvider } from "@/lib/sendbird-calls";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function JoinMeeting() {
  if (!process.env.NEXT_PUBLIC_SENDBIRD_APP_ID) {
    throw new Error("SENDBIRD_APP_ID is not defined");
  }

  const pathname = usePathname();
  const [isJoinedMeeting, setIsJoinedMeeting] = useState(false);
  const appointmentId = pathname?.split("/").pop();

  if (!appointmentId) {
    return <div>No meeting ID</div>;
  }

  const appointmentQuery = useAppointmentQuery(appointmentId);
  const meetingRoomId = appointmentQuery.data?.appointment.meetingRoomId;

  if (isJoinedMeeting && meetingRoomId) {
    return (
      <SbCallsProvider appId={process.env.NEXT_PUBLIC_SENDBIRD_APP_ID}>
        <GroupCallScreen roomId={meetingRoomId} />
      </SbCallsProvider>
    );
  }
  
  return (
    <div className="w-screen min-h-screen flex items-center justify-center">
      <div className="flex w-full gap-8 px-8 max-w-screen-2xl">
        {/* Live video before joining to see how you look */}
        <VideoCam className="flex-1" />

        {/* Meeting info */}
        <div className="flex-1 flex items-center">
          {appointmentId && (
            <div className="flex flex-col gap-8">
              <MeetingInfo meetingId={appointmentId} />
              <Button
                className="w-full"
                onClick={() => setIsJoinedMeeting(true)}
              >
                <Icon className="mr-2" type={IconType.VIDEO} size={18} />
                Join meeting
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
