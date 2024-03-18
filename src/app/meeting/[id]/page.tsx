import JoinMeeting from "@/components/meeting/JoinMeeting";

export default function MeetingPage({ params }: { params: { id: string } }) {
  return <JoinMeeting appointmentId={params.id} />;
}
