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

const GroupCallScreen = () => {
  const sbCalls = useSbCalls();
  const query = useSearchParams();
  const [isRoomCreated, setIsRoomCreated] = useState(false);
  const roomIdQuery = query.get("room_id");
  const { rooms } = sbCalls;

  useEffect(() => {
    const room = rooms[rooms.length - 1];
  }, [rooms]);

  useEffect(() => {
    console.log("isAuthenticated ==> ", sbCalls.isAuthenticated);
    if (roomIdQuery) {
      enter(roomIdQuery);
    } else if (sbCalls.isAuthenticated && !isRoomCreated) {
      // createRoom();
      setIsRoomCreated(true);
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
      <SbCallsAuthenticator
        appId="88D50577-7CD1-4BC0-BF38-5AD91CE32645"
        userId="pankajgurbani"
      />
      {onCall && <GroupCall room={onCall} />}
    </div>
  );
};

export default GroupCallScreen;
