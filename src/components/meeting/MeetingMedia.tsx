/**
 * @todo work in progress
 */

import { StatefulRoom } from "@/lib/sendbird-calls";
import { useEffect, useState } from "react";
import { Avatar } from "../ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Icon, { IconType } from "../ui/Icon";

const ParticipantsRow = ({
  rows,
  children,
}: {
  rows: number;
  children: React.ReactNode;
}) => (
  <div
    className={`
      flex justify-center items-center w-full mb-4
      last:mb-0
    `}
    style={{ maxHeight: Math.ceil(100 / rows) + "%" }}
  >
    {children}
  </div>
);

const ParticipantView = ({
  rows,
  width,
  height,
  isLocal = false,
  children,
}: {
  rows: number;
  width: number;
  height: number;
  isLocal?: boolean;
  children: React.ReactNode;
}) => (
  <div
    className="relative aspect-video h-full first:mr-4 before:block before:content-[''] before:pt-[56.25%]"
    style={{
      width:
        Math.min(((height - 184) / rows) * (16 / 9), (width - 32) / 2) + "px",
    }}
  >
    <div className="absolute top-0 left-0 w-full h-full">{children}</div>
  </div>
);

const AvatarOverlay = ({ src }: { src: string }) => (
  <div className="absolute top-0 bottom-0 w-full flex items-center justify-center">
    <Avatar className="w-24 h-24">
      <AvatarImage src={src} alt="User avatar" />
      <AvatarFallback>
        <Icon type={IconType.USER} size={48} />
      </AvatarFallback>
    </Avatar>
  </div>
);

const CallInfo = () => (
  <div className="absolute flex bottom-0 m-4 items-center justify-center p-3 rounded-full bg-background opacity-50">
    <Icon type={IconType.MIC_OFF} size={24} />
  </div>
);

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

  // Render single video if the other participants are not present
  if (!remoteParticipants.length) {
    return (
      <div className="w-full flex flex-grow pb-20">
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
          <AvatarOverlay src={localParticipant.user.profileUrl} />
        )}
        {!localParticipant.isAudioEnabled && (
          <div className="absolute flex self-end m-4 items-center justify-center p-3 rounded-full bg-background opacity-50">
            <Icon type={IconType.MIC_OFF} size={24} />
          </div>
        )}
      </div>
    );
  }

  const rows = Math.ceil(participants.length / 2);

  return (
    <div className="w-full flex flex-grow flex-col pb-20">
      {Array(rows)
        .fill(0)
        .map((_x, i) => {
          const p1 = participants[i * 2];
          const p2 = participants[i * 2 + 1];

          return (
            <ParticipantsRow key={i} rows={rows}>
              {[p1, p2].map(
                (p) =>
                  p && (
                    <ParticipantView
                      rows={rows}
                      width={windowDimensions.width}
                      height={windowDimensions.height}
                      key={p.participantId}
                    >
                      <video
                        autoPlay
                        className="w-full h-full object-cover rounded-xl -scale-x-100"
                        playsInline
                        muted={
                          p.participantId === localParticipant.participantId
                        }
                        ref={(el) => {
                          if (!el) return;
                          p.setMediaView(el);
                        }}
                      />
                      {p.isVideoEnabled || (
                        <AvatarOverlay src={p.user.profileUrl} />
                      )}
                      {p.isAudioEnabled || <CallInfo />}
                    </ParticipantView>
                  )
              )}
            </ParticipantsRow>
          );
        })}
    </div>
  );
}
