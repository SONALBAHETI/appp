import UserMatchList from "@/components/matches/UserMatchList";

export default function MatchesPage({ params }: { params: { id: string } }) {
  return (
    <div className="main-page">
      <UserMatchList userMatchId={params.id} />
    </div>
  );
}
