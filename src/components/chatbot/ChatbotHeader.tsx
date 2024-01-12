import OnlineStatus from "@/components/ui/OnlineStatus/OnlineStatus";
import ScottieProfilePic from "./ScottieProfilePic";

export default function ChatbotHeader() {
  return (
    <div className="flex gap-2 items-center">
      <ScottieProfilePic />
      <div>
        {/* Scottie's name */}
        <h4 className="text-md font-semibold leading-none tracking-tight">
          Scottie
        </h4>
        {/* Scottie's online status */}
        <OnlineStatus status="online" />
      </div>
    </div>
  );
}
