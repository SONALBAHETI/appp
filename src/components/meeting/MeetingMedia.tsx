/**
 * @todo work in progress
 */

import { StatefulRoom } from "@/lib/sendbird-calls";
import { useEffect, useState } from "react";
import { Avatar } from "../ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Icon, { IconType } from "../ui/Icon";

interface IMeetingMediaProps {
  room: StatefulRoom;
}

export default function MeetingMedia({ room }: IMeetingMediaProps) {
  const { participants, localParticipant, remoteParticipants } = room;

  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  };

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full flex flex-grow">
      <video
        className="w-full max-h-[calc(100vh-9rem)] object-cover rounded-xl -scale-x-100"
        autoPlay
        playsInline
        muted
        ref={(el) => {
          if (!el) return;
          localParticipant.setMediaView(el);
        }}
      />
      {!localParticipant.isVideoEnabled && (
        <div className="absolute self-center w-full flex items-center justify-center">
          <Avatar className="w-24 h-24">
            <AvatarImage
              src={localParticipant.user.profileUrl}
              alt="user profile"
            />
            <AvatarFallback>
              <Icon type={IconType.USER} size={48} />
            </AvatarFallback>
          </Avatar>
        </div>
      )}
      {
        !localParticipant.isAudioEnabled && (
          <div className="absolute flex self-end m-4 items-center justify-center p-3 rounded-full bg-background opacity-50">
            <Icon type={IconType.MIC_OFF} size={24} />
          </div>
        )
      }
    </div>
  );
}
