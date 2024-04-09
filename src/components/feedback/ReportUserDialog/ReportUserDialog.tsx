"use client";

import { Textarea } from "@/components/ui/FormFields";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  ReportUserFormSchema,
  UserReportCategories,
  UserReportCategory,
} from "./reportUserForm.validation";
import { useReportUserMutation } from "@/api/feedback";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Loader from "@/components/ui/Loader";
import { toast } from "react-toastify";
import { IReportUserResponse } from "@/interfaces/feedback";

interface IReportUserProps {
  userId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ReportUserDialog({
  userId,
  open,
  onOpenChange,
}: IReportUserProps) {
  const reportUserMutation = useReportUserMutation(userId);

  const form = useForm<ReportUserFormSchema>({
    resolver: zodResolver(ReportUserFormSchema),
  });

  const onSubmit = async (data: ReportUserFormSchema) => {
    try {
      const response = (await reportUserMutation.mutateAsync(
        data
      )) as IReportUserResponse;
      toast.success(
        "Your report was submitted successfully. Ref: " + response.referenceId
      );
    } catch (error) {
      toast.error("Couldn't submit your report. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Report inappropriate behavior</DialogTitle>
              <DialogDescription>
                If you think this user is engaging in inappropriate behavior,
                please tell us what happened here. Our team will review it to
                make sure everyone in our community is safe and treated with
                respect.
              </DialogDescription>
              <FormField
                control={form.control}
                name="category"
                defaultValue={UserReportCategory.HARASSMENT}
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        {UserReportCategories.map((category) => (
                          <FormItem
                            key={category}
                            className="flex items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem value={category} />
                            </FormControl>
                            <FormLabel className="font-normal capitalize">
                              {category}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="reason"
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <FormItem>
                    <FormLabel>Reason</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Please tell us what happened here..."
                        value={value}
                        onChange={onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </DialogHeader>
            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="secondary">Cancel</Button>
              </DialogClose>
              <Button variant="secondary" type="submit">
                {reportUserMutation.isPending && <Loader className="mr-2" />}
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
