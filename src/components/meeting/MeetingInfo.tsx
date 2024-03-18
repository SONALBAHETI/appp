"use client";

import { useAppointmentQuery } from "@/api/appointment";
import { AppointmentUserReference } from "@/interfaces/appointment";
import { Skeleton } from "../ui/skeleton";

interface IMeetingInfoProps {
  meetingId: string;
}

export default function MeetingInfo({ meetingId }: IMeetingInfoProps) {
  const appointmentQuery = useAppointmentQuery(meetingId);

  if (appointmentQuery.isPending) {
    return <MeetingInfoSkeleton />;
  }

  if (appointmentQuery.isError) {
    return <div>{appointmentQuery.error.message}</div>;
  }

  const { appointment } = appointmentQuery.data;
  const scheduledBy = appointment.scheduledBy as AppointmentUserReference;
  const scheduledWith = appointment.scheduledWith as AppointmentUserReference;

  return (
    <div className="flex w-full flex-col gap-2">
      <h3>{`${scheduledBy.name} with ${scheduledWith.name}`}</h3>
      <p>
        <span className="font-medium">Meeting goals - </span>
        <span className="text-faded">{appointment.userGoals}</span>
      </p>
    </div>
  );
}

const MeetingInfoSkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-3">
      <Skeleton className="w-1/2 h-4" />
      <div className="flex flex-col gap-2">
        <Skeleton className="w-96 h-3" />
        <Skeleton className="w-1/3 h-3" />
      </div>
    </div>
  );
};
