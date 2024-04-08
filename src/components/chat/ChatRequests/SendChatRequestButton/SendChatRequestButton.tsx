"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { forwardRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  usePendingChatRequestSentToUserQuery,
  useSendChatRequestMutation,
} from "@/api/chat";
import { useForm } from "react-hook-form";
import { SendChatRequestFormSchema } from ".";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/FormFields";
import { toast } from "react-toastify";
import Loader from "@/components/ui/Loader";
import Icon, { IconType } from "@/components/ui/Icon";
import { Skeleton } from "@/components/ui/skeleton";

interface ISendChatRequestButtonProps extends ButtonProps {
  toUserId: string;
}

const SendChatRequestButton = forwardRef<
  HTMLButtonElement,
  ISendChatRequestButtonProps
>(({ children, variant = "outline", className, toUserId, ...props }, ref) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const pendingChatRequestSentToUserQuery =
    usePendingChatRequestSentToUserQuery(toUserId);
  const sendChatRequestMutation = useSendChatRequestMutation(toUserId);

  const form = useForm<SendChatRequestFormSchema>({
    resolver: zodResolver(SendChatRequestFormSchema),
  });

  const onSubmit = async (data: SendChatRequestFormSchema) => {
    try {
      await sendChatRequestMutation.mutateAsync({
        userId: toUserId,
        message: data.message,
      });
      setIsDialogOpen(false);
    } catch (error) {
      toast.error("Couldn't send the chat request");
    }
  };

  if (pendingChatRequestSentToUserQuery.isPending) {
    return (
      <Skeleton className="w-full h-full rounded-lg" />
    )
  }

  if (pendingChatRequestSentToUserQuery.data?.chatRequest) {
    return (
      <div className="flex items-center justify-center gap-2 w-full text-accent-2 cursor-default h-full rounded-lg bg-accent-2-light">
        <Icon type={IconType.CLOCK} size={18} />
        Chat request pending
      </div>
    );
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          ref={ref}
          variant={variant}
          className={cn(
            "border-primary text-primary hover:text-primary",
            className
          )}
          {...props}
        >
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send chat request</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="message"
              defaultValue=""
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea placeholder="Type your message here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="flex items-center gap-4 mt-4">
              <Button type="submit">
                {sendChatRequestMutation.isPending && (
                  <Loader className="mr-2" />
                )}
                Send
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
});

export default SendChatRequestButton;
