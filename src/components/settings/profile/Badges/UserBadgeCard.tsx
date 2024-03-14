import Icon, { IconType } from "@/components/ui/Icon";
import { Button } from "@/components/ui/button";
import { IUserBadge } from "@/interfaces/user";

interface IUserBadgeCardProps {
  badge: IUserBadge;
}

export default function UserBadgeCard({ badge }: IUserBadgeCardProps) {
  return (
    <div className="flex flex-col items-center gap-y-4 rounded-lg border border-primary bg-accent-2-light p-4 max-w-xs text-center">
      <img className="w-40 h-40 object-cover rounded-md" src={badge.icon} alt={badge.name + " badge"} />
      <div>
        <p className="font-bold text-lg">{badge.name}</p>
        <p className="text-faded text-sm">{badge.description}</p>
      </div>
      <Button variant="outline">
        <Icon type={IconType.SHARE} className="mr-2" /> Share
      </Button>
    </div>
  );
}
