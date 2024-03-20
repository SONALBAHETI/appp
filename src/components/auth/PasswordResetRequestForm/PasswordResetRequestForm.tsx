"use client";

import { useForm } from "react-hook-form";
import { PasswordResetRequestFormSchema } from "./passwordResetRequestForm.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSendResetPasswordEmailMutation } from "@/api/auth";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/Loader";
import { toast } from "react-toastify";
import { useState } from "react";
import Icon, { IconType } from "@/components/ui/Icon";
import PopularInboxLinks from "@/components/email/PopularInboxLinks";
import { AxiosError } from "axios";

export interface IPasswordResetRequestFormProps
  extends React.HTMLAttributes<HTMLDivElement> {
  redirect: string;
}

export default function PasswordResetRequestForm({
  className,
  redirect,
  ...props
}: IPasswordResetRequestFormProps) {
  const sendResetPasswordEmailMutation = useSendResetPasswordEmailMutation();

  const [emailSent, setEmailSent] = useState(false);

  const form = useForm<PasswordResetRequestFormSchema>({
    resolver: zodResolver(PasswordResetRequestFormSchema),
    mode: "onSubmit",
  });

  async function onSubmit(data: PasswordResetRequestFormSchema) {
    try {
      await sendResetPasswordEmailMutation.mutateAsync({
        email: data.email,
        redirect,
      });
      setEmailSent(true);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.message);
      } else {
        toast.error("Couldn't send password reset email");
      }
    }
  }
  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="email"
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={sendResetPasswordEmailMutation.isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {emailSent && (
            <>
              <p className="text-sm text-primary">
                <Icon type={IconType.CHECK} className="mr-2 inline" />
                Email sent! Check your inbox to reset your password.
              </p>
              <PopularInboxLinks />
            </>
          )}
          {!emailSent && (
            <Button
              type="submit"
              className="w-full"
              disabled={sendResetPasswordEmailMutation.isPending}
            >
              {sendResetPasswordEmailMutation.isPending && (
                <Loader className="mr-2" />
              )}
              Send password reset email
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}
