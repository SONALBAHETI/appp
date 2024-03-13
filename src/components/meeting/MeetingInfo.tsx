"use client";

import { useAppointmentQuery } from "@/api/appointment";
import { AppointmentUserReference } from "@/interfaces/appointment";

interface IMeetingInfoProps {
  meetingId: string;
}

export default function MeetingInfo({ meetingId }: IMeetingInfoProps) {
  const appointmentQuery = useAppointmentQuery(meetingId);

  if (appointmentQuery.isPending) {
    return <div>Loading...</div>;
  }

  if (appointmentQuery.isError) {
    return <div>Something went wrong</div>;
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
