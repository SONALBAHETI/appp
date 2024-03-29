"use client";

import { AllRoutes } from "@/components/navigation/routes";
import { QuickReplyList } from "@/components/settings/account/QuickReply";
import CreateQuickReply from "@/components/settings/account/QuickReply/CreateQuickReply";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useChatStore } from "@/store/useChatStore";
import Link from "next/link";
import { useState } from "react";

interface IQuickReplyPopupProps {
  asChild?: boolean;
  children: React.ReactNode;
}

export default function QuickReplyPopup({
  asChild,
  children,
}: IQuickReplyPopupProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { setSelectedQuickReply } = useChatStore();
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Quick Replies</DialogTitle>
        </DialogHeader>
        <QuickReplyList
          className="max-h-[calc(100vh-20rem)] overflow-y-scroll"
          showEditButton={false}
          showDeleteButton={false}
          showCopyButton={false}
          onSelect={(quickReply) => {
            setSelectedQuickReply(quickReply.text);
            setIsDialogOpen(false);
          }}
        />
        <DialogFooter className="flex items-center gap-4">
          <Link className="underline underline-offset-4" href={AllRoutes.Settings.Account.QuickReplies.path}>
            Manage Quick Replies
          </Link>
          <CreateQuickReply />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
