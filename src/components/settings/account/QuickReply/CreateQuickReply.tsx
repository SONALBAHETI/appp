"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import UpdateQuickReply from "./UpdateQuickReply";
import { useState } from "react";

interface ICreateQuickReplyProps {
  asChild?: boolean;
  children?: React.ReactNode;
}

export default function CreateQuickReply({
  children,
  asChild = false,
}: ICreateQuickReplyProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogTrigger asChild={asChild || !children}>
        {children || <Button>New Quick Reply</Button>}
      </DialogTrigger>
      <DialogContent>
        <UpdateQuickReply isNew onSuccess={() => setIsEditDialogOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
