"use client";

import {
  useCreateQuickReplyMutation,
  useSingleQuickReplyQuery,
  useUpdateQuickReplyMutation,
} from "@/api/accountSettings";
import { Textarea } from "@/components/ui/FormFields";
import Loader from "@/components/ui/Loader";
import { Button } from "@/components/ui/button";
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { QuickReplySchema } from "@/validation/settingsValidations/quickReply.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type IUpdateQuickReplyNewProps = {
  isNew: true;
  quickReplyId?: undefined;
};
type IUpdateQuickReplyExistingProps = {
  isNew?: false;
  quickReplyId: string;
};
type TUpdateQuickReplyConditionalProps =
  | IUpdateQuickReplyNewProps
  | IUpdateQuickReplyExistingProps;

export default function UpdateQuickReply({
  isNew = false,
  quickReplyId,
  onSuccess,
}: TUpdateQuickReplyConditionalProps & {
  onSuccess?: () => void;
}) {
  const singleQuickReplyQuery = useSingleQuickReplyQuery(quickReplyId || "");
  const createQuickReplyMutation = useCreateQuickReplyMutation();
  const updateQuickReplyMutation = useUpdateQuickReplyMutation(
    quickReplyId || ""
  );

  const form = useForm<QuickReplySchema>({
    resolver: zodResolver(QuickReplySchema),
  });

  // update form values on singleQuickReplyQuery fetch complete
  useEffect(() => {
    if (singleQuickReplyQuery.isSuccess) {
      form.reset({
        title: singleQuickReplyQuery.data.quickReply.title,
        text: singleQuickReplyQuery.data.quickReply.text,
        shortcut: singleQuickReplyQuery.data.quickReply.shortcut,
      });
    }
  }, [singleQuickReplyQuery.data, singleQuickReplyQuery.isSuccess]);

  const onSubmit = async (data: QuickReplySchema) => {
    try {
      if (isNew) {
        await createQuickReplyMutation.mutateAsync(data);
      } else {
        await updateQuickReplyMutation.mutateAsync(data);
      }
      onSuccess?.();
    } catch (error) {
      toast.error("Couldn't save quick reply.");
    }
  };

  return (
    <>
      <Form {...form}>
        <DialogHeader>
          <DialogTitle>
            {isNew ? "Add a quick reply" : "Update quick reply"}
          </DialogTitle>
        </DialogHeader>

        <form
          className="flex flex-col gap-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            defaultValue=""
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    placeholder="Type a title"
                    disabled={singleQuickReplyQuery.isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Reply Text */}
          <FormField
            control={form.control}
            name="text"
            defaultValue=""
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Textarea placeholder="Type your reply here" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Shortcut */}
          <FormField
            control={form.control}
            name="shortcut"
            defaultValue=""
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    placeholder="Add a short code for quick access (e.g. hello)"
                    disabled={singleQuickReplyQuery.isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Footer */}
          <DialogFooter>
            <Button variant="outline">Discard</Button>
            <Button type="submit">
              {createQuickReplyMutation.isPending && (
                <Loader className="mr-2" />
              )}
              Save
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
}
