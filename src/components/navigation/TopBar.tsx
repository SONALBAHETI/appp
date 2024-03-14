import { cn } from "@/lib/utils";
import PathHeading from "./PathHeading";
import UserPopup from "./UserPopup";

interface ITopBarProps extends React.HTMLAttributes<HTMLDivElement> {}

const TopBar = ({ className, ...props }: ITopBarProps) => {
  return (
    <div
      {...props}
      className={cn("flex justify-between items-center py-5 bg-secondary z-50", className)}
    >
      {/* Left side */}
      <div>
        <PathHeading />
      </div>

      {/* Right side */}
      <div>
        <UserPopup />
      </div>
    </div>
  );
};

export default TopBar;
