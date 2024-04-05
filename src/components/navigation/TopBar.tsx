import { cn } from "@/lib/utils";
import PathHeading from "./PathHeading";
import UserPopup from "./UserPopup";
import NotificationPopup from "./NotificationPopup";
import OnlineStatusSwitcher from "../settings/availability/OnlineStatusSwitcher";
import ProtectedComponent from "../access-control/ProtectedComponent";
import { Role } from "@/constants/user";

interface ITopBarProps extends React.HTMLAttributes<HTMLDivElement> {}

const TopBar = ({ className, ...props }: ITopBarProps) => {
  return (
    <div
      {...props}
      className={cn(
        "flex justify-between items-center py-5 bg-secondary z-50",
        className
      )}
    >
      {/* Left side */}
      <div>
        <PathHeading />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-6">
        <ProtectedComponent allowedRoles={[Role.MENTOR]}>
          <OnlineStatusSwitcher />
        </ProtectedComponent>
        <NotificationPopup />
        <UserPopup />
      </div>
    </div>
  );
};

export default TopBar;
