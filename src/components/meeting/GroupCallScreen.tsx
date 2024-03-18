"use client";

/**
 * @todo work in progress
 */

import { useSbCalls } from "@/lib/sendbird-calls";
import React, { useCallback, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import SbCallsAuthenticator from "@/lib/sendbird-calls/SbCallsAuthenticator";
import GroupCall from "./GroupCall";
import { useChatCredentialsQuery } from "@/api/chat";

interface IGroupCallScreenProps {
  roomId: string;
  onExit?: () => void;
}

const GroupCallScreen = ({ roomId, onExit }: IGroupCallScreenProps) => {
  const sbCalls = useSbCalls();

  /* server state */
  const chatCredentialsQuery = useChatCredentialsQuery();

  const { rooms } = sbCalls;

  useEffect(() => {
    if (roomId && sbCalls.isAuthenticated) {
      enter(roomId);
    } 
  }, [sbCalls.isAuthenticated]);

  const onCall = useMemo(() => {
    return rooms.find((r) => !!r.localParticipant);
  }, [rooms]);

  const enter = useCallback(
    async (roomId: string) => {
      try {
        const room = await sbCalls.fetchRoomById(roomId);
        room
          .enter({
            audioEnabled: true,
            videoEnabled: true,
          })
          .catch((error) => {
            toast.error(error.message);
          });
      } catch (e) {
        console.error(e);
        toast.error("Check room ID and try again.");
      }
    },
    [sbCalls]
  );

  return (
    <div>
      {chatCredentialsQuery.isPending && <div>Loading...</div>}
      {chatCredentialsQuery.data?.userId &&
        chatCredentialsQuery.data?.accessToken && (
          <>
            <SbCallsAuthenticator
              appId={process.env.NEXT_PUBLIC_SENDBIRD_APP_ID || ""}
              userId={chatCredentialsQuery.data.userId}
              accessToken={chatCredentialsQuery.data.accessToken}
            />
            {onCall && <GroupCall onExit={onExit} room={onCall} />}
          </>
        )}
    </div>
  );
};

export default GroupCallScreen;
