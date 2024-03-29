"use client";

import CopyToClipboard from "@/components/ui/copy-to-clipboard";
import QuickReplyContainer from "./QuickReplyContainer";
import Icon, { IconType } from "@/components/ui/Icon";
import { IQuickReply } from "@/interfaces/quickReply";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import UpdateQuickReply from "./UpdateQuickReply";
import DeleteQuickReply from "./DeleteQuickReply";
import { useState } from "react";

interface IQuickReplyProps {
  quickReply: IQuickReply;
  showEditButton?: boolean;
  showDeleteButton?: boolean;
  showCopyButton?: boolean;
  onSelect?: (quickReply: IQuickReply) => void;
}

export default function QuickReply({
  quickReply,
  showEditButton = true,
  showDeleteButton = true,
  showCopyButton = true,
  onSelect,
}: IQuickReplyProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  return (
    <QuickReplyContainer className={onSelect ? "cursor-pointer hover:shadow-md" : ""}>
      <div className="flex gap-x-3" onClick={() => onSelect?.(quickReply)}>
        {/* Quick reply info */}
        <div className="flex flex-grow flex-col gap-y-2">
          <div>
            <h6 className="font-medium">{quickReply.title}</h6>
            <p className="text-faded">{quickReply.text}</p>
          </div>
          <div className="flex items-center gap-x-2">
            <p className="text-faded">/{quickReply.shortcut}</p>
            {showCopyButton && (
              <CopyToClipboard text={`/${quickReply.shortcut}`} />
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-y-2">
          {showEditButton && (
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogTrigger>
                <Icon type={IconType.EDIT} />
              </DialogTrigger>
              <DialogContent>
                <UpdateQuickReply
                  quickReplyId={quickReply.id}
                  onSuccess={() => setIsEditDialogOpen(false)}
                />
              </DialogContent>
            </Dialog>
          )}
          {showDeleteButton && (
            <DeleteQuickReply quickReplyId={quickReply.id} />
          )}
        </div>
      </div>
    </QuickReplyContainer>
  );
}
