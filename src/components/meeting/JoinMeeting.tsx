"use client";

import { useAppointmentQuery } from "@/api/appointment";
import GroupCallScreen from "@/components/meeting/GroupCallScreen";
import MeetingInfo from "@/components/meeting/MeetingInfo";
import VideoCam from "@/components/meeting/VideoCam";
import Icon, { IconType } from "@/components/ui/Icon";
import { Button } from "@/components/ui/button";
import { SbCallsProvider } from "@/lib/sendbird-calls";
import { useState } from "react";
import Loader from "../ui/Loader";

export default function JoinMeeting({
  appointmentId,
}: {
  appointmentId: string;
}) {
  if (!process.env.NEXT_PUBLIC_SENDBIRD_APP_ID) {
    throw new Error("SENDBIRD_APP_ID is not defined");
  }

  const [isJoinedMeeting, setIsJoinedMeeting] = useState(false);

  const onExit = () => {
    setIsJoinedMeeting(false);
  };

  const appointmentQuery = useAppointmentQuery(appointmentId);
  const meetingRoomId = appointmentQuery.data?.appointment.meetingRoomId;

  if (isJoinedMeeting && meetingRoomId) {
    return (
      <SbCallsProvider appId={process.env.NEXT_PUBLIC_SENDBIRD_APP_ID}>
        <GroupCallScreen onExit={onExit} roomId={meetingRoomId} />
      </SbCallsProvider>
    );
  }

  if (appointmentQuery.isPending) {
    return (
      <div className="full-screen absolute-center text-faded">
        <div className="flex items-center px-6 py-6 bg-primary/10 rounded-lg">
          <Loader className="mr-2" /> Getting appointment details
        </div>
      </div>
    );
  } else if (appointmentQuery.isError) {
    return (
      <div className="full-screen absolute-center text-faded">
        <div className="flex items-center px-6 py-6 bg-destructive/10 rounded-lg">
          {appointmentQuery.error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen min-h-screen flex items-center justify-center">
      <div className="flex flex-wrap justify-center w-full gap-8 px-8 max-w-screen-2xl">
        {/* Live video before joining to see how you look */}
        <VideoCam className="flex-1" />

        {/* Meeting info */}
        <div className="flex flex-1 justify-center items-center">
          <div className="flex flex-col gap-8">
            <MeetingInfo meetingId={appointmentId} />
            <Button
              disabled={!meetingRoomId}
              className="w-full"
              onClick={() => setIsJoinedMeeting(true)}
            >
              <Icon className="mr-2" type={IconType.VIDEO} size={18} />
              Start session
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
