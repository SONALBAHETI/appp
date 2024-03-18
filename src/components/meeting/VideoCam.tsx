"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

export interface IVideoCamProps
  extends React.VideoHTMLAttributes<HTMLVideoElement> {}

const VideoCam = ({ className, ...props }: IVideoCamProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const getMediaStream = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      return () => {
        const stream = videoRef.current?.srcObject as MediaStream;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach((track) => track.stop());
        }
      };
    };

    getMediaStream();
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted
      className={cn("w-full aspect-video object-cover rounded-xl border -scale-x-100", className)}
      {...props}
    />
  );
};

export default VideoCam;
