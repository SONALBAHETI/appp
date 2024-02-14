import { IMatch } from "@/interfaces/userMatch";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarImage } from "../ui/avatar";

export default function UserMatchCardMini({ match }: { match: IMatch }) {
  return (
    <Card className="bg-background/60">
      <CardContent className="flex gap-4 items-center mt-4">
        <div>
          <Avatar className="w-20 h-20">
            <AvatarImage
              src={match.picture}
              alt={`${match.name} profile picture`}
            />
          </Avatar>
        </div>
        <div>
          <h6>{match.name}</h6>
          <div className="flex items-center gap-3">
            <p className="text-faded">{match.primaryRole}</p>
            <p className="bg-accent-2 text-accent-2-foreground px-2 py-[3px] rounded-lg text-sm">
              {match.yearsInClinicalPractice}+ Years
            </p>
          </div>
          {/* TODO: Temporary, remove this */}
          {match.score && (
            <p className="text-faded">{Math.floor(match.score)}% match</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
