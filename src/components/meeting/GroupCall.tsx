/**
 * @todo work in progress
 */

import { StatefulRoom } from "@/lib/sendbird-calls";
import MeetingMedia from "./MeetingMedia";
import ButtonIcon from "../ui/ButtonIcon";
import { IconType } from "../ui/Icon";
import GroupCallEnd from "./GroupCallEnd";

export default function GroupCall({
  room,
  onExit,
}: {
  room: StatefulRoom;
  onExit?: () => void;
}) {
  const { localParticipant } = room;

  const toggleMic = () => {
    if (localParticipant.isAudioEnabled) {
      localParticipant.muteMicrophone();
    } else {
      localParticipant.unmuteMicrophone();
    }
  };

  const toggleCamera = () => {
    if (localParticipant.isVideoEnabled) {
      localParticipant.stopVideo();
    } else {
      localParticipant.startVideo();
    }
  };

  const onEndCall = () => {
    room.exit();
    onExit?.();
  };

  return (
    <div className="w-screen h-screen max-h-screen flex items-center bg-black/90 px-4 pt-5 pb-8">
      <div className="flex flex-col gap-6 items-center w-full">
        {/* Meeting media */}
        <MeetingMedia room={room} />
        {/* Footer buttons */}
        <div className="fixed bottom-10 flex gap-4 items-center justify-center z-10">
          {/* End call button */}
          <GroupCallEnd onConfirmEnd={onEndCall} />

          {/* Mic button */}
          <ButtonIcon
            className="rounded-full w-14 h-14"
            iconSize={24}
            size="default"
            iconType={
              localParticipant.isAudioEnabled ? IconType.MIC : IconType.MIC_OFF
            }
            onClick={toggleMic}
          />

          {/* Camera button */}
          <ButtonIcon
            className="rounded-full w-14 h-14"
            iconSize={24}
            size="default"
            iconType={
              localParticipant.isVideoEnabled
                ? IconType.CAMERA
                : IconType.CAMERA_OFF
            }
            onClick={toggleCamera}
          />

          {/* Quick note button */}
          <ButtonIcon
            className="rounded-full w-14 h-14"
            iconSize={24}
            size="default"
            iconType={IconType.NOTE}
          />
        </div>
      </div>
    </div>
  );
}
