"use client";

/**
 * @todo work in progress
 */

import { useSbCalls } from "@/lib/sendbird-calls";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import SbCallsAuthenticator from "@/lib/sendbird-calls/SbCallsAuthenticator";
import GroupCall from "./GroupCall";
import { useChatCredentialsQuery } from "@/api/chat";

const GroupCallScreen = () => {
  const sbCalls = useSbCalls();
  const query = useSearchParams();
  const roomIdQuery = query.get("room_id");

  /* server state */
  const chatCredentialsQuery = useChatCredentialsQuery();

  const { rooms } = sbCalls;

  useEffect(() => {
    if (roomIdQuery && sbCalls.isAuthenticated) {
      enter(roomIdQuery);
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

  const createRoom = useCallback(() => {
    sbCalls
      .createRoom({ roomType: sbCalls.RoomType.SMALL_ROOM_FOR_VIDEO })
      .then((room) => {
        console.log("room created", room);
        return room.enter({
          audioEnabled: true,
          videoEnabled: true,
        });
      })
      .catch((e) => {
        toast.error(e.message);
      });
  }, [sbCalls]);

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
            {onCall && <GroupCall room={onCall} />}
          </>
        )}
    </div>
  );
};

export default GroupCallScreen;
