"use client";

import ConfirmDialog from "@/components/ui/ConfirmDialog";
import Icon, { IconType } from "@/components/ui/Icon";
import { useDeleteQuickReplyMutation } from "@/api/accountSettings";
import { toast } from "react-toastify";

interface IDeleteQuickReplyProps {
  asChild?: boolean;
  children?: React.ReactNode;
  quickReplyId: string;
}
export default function DeleteQuickReply({
  children,
  asChild,
  quickReplyId,
}: IDeleteQuickReplyProps) {
  const deleteQuickReplyMutation = useDeleteQuickReplyMutation(quickReplyId);

  const onConfirm = async () => {
    try {
      await deleteQuickReplyMutation.mutateAsync(undefined);
    } catch (error) {
      toast.error("Couldn't delete quick reply.");
    }
  };

  return (
    <ConfirmDialog
      asChild={asChild}
      onConfirm={onConfirm}
      title="Are you sure?"
      description="This action cannot be undone."
    >
      {children || <Icon type={IconType.TRASH} />}
    </ConfirmDialog>
  );
}
