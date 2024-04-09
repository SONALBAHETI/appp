import ButtonIcon from "@/components/ui/ButtonIcon";
import { IconType } from "@/components/ui/Icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ReportUserDialog from "@/components/feedback/ReportUserDialog";
import { useState } from "react";

export default function ChannelHeaderActions({
  memberId,
}: {
  memberId: string;
}) {
  const [isUserReportDialogOpen, setIsUserReportDialogOpen] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <ButtonIcon
            variant="ghost"
            iconType={IconType.MORE_VERTICAL}
            iconSize={22}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setIsUserReportDialogOpen(true)}>
            Report user
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dialogs */}
      <ReportUserDialog
        userId={memberId}
        open={isUserReportDialogOpen}
        onOpenChange={setIsUserReportDialogOpen}
      />
    </>
  );
}
