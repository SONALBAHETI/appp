import { QuickReplyList } from "@/components/settings/account/QuickReply";
import CreateQuickReply from "@/components/settings/account/QuickReply/CreateQuickReply";

export default function QuickRepliesSettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2 justify-between">
        {/* Heading and subtext */}
        <div>
          <h4>Quick replies</h4>
          <p className="text-faded">
            Create your own quick replies or use pre-built ones for faster
            interactions with your mentees.
          </p>
        </div>
        {/* New quick reply */}
        <CreateQuickReply />
      </div>

      {/* quick replies */}
      <div className="flex flex-col gap-y-2">
        <QuickReplyList />
      </div>
    </div>
  );
}
