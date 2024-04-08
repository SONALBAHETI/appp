import { IMatch } from "@/interfaces/userMatch";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "../ui/button";
import Icon, { IconType } from "../ui/Icon";
import SendChatRequestButton from "../chat/ChatRequests/SendChatRequestButton";
import ProfilePicture from "../ui/ProfilePicture";

export default function UserMatchCard({ match }: { match: IMatch }) {
  return (
    <Card className="bg-background/60">
      <CardContent className="flex gap-4 items-center mt-4">
        <ProfilePicture
          className="w-20 h-20 text-xl"
          userName={match.name}
          profilePic={match.picture}
        />
        <div className="grid grid-cols-1 gap-[2px]">
          <h6>{match.name}</h6>
          <div className="flex items-center gap-3">
            {match.primaryRole && (
              <p className="text-faded text-sm">{match.primaryRole}</p>
            )}
            <p className="bg-accent-2-light text-foreground border border-faded px-2 py-[2px] rounded-lg text-xs">
              <span className="mr-1">{match.yearsInClinicalPractice}+</span>
              <span>
                {match.yearsInClinicalPractice === 1 ? "year" : "years"}
              </span>
            </p>
          </div>
          {match.score && (
            <p className="text-faded text-sm">
              {Math.floor(match.score)}% match
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-2">
        <SendChatRequestButton toUserId={match.user as string}>
          <Icon type={IconType.CHAT} className="mr-2" />
          Send Chat Request
        </SendChatRequestButton>
        {/* @todo book appointment implementation */}
        <Button variant="accent">
          <Icon type={IconType.CALENDAR} className="mr-2" />
          Book Appointment
        </Button>
      </CardFooter>
    </Card>
  );
}
