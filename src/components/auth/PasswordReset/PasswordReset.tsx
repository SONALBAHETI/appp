"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { PasswordResetSchema } from "./passwordReset.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useResetPasswordMutation } from "@/api/auth";
import { toast } from "react-toastify";
import Loader from "@/components/ui/Loader";
import { useRouter, useSearchParams } from "next/navigation";

interface IPasswordResetProps {
  showIllustration?: boolean;
}

export default function PasswordReset({
  showIllustration = true,
}: IPasswordResetProps) {
  // router
  const searchParams = useSearchParams();
  const router = useRouter();

  // url params
  const token = searchParams.get("token");
  const redirect = searchParams.get("redirect");

  // token is required
  if (!token) {
    return null;
  }

  // server mutation
  const { isPending, mutateAsync } = useResetPasswordMutation();

  // react hook form validation
  const form = useForm<PasswordResetSchema>({
    resolver: zodResolver(PasswordResetSchema),
  });

  // submit reset password
  const onSubmit = async (data: PasswordResetSchema) => {
    try {
      await mutateAsync({
        token,
        password: data.newPassword,
      });
      toast.success("Password reset successfully");
      if (redirect) {
        router.push(redirect);
      }
    } catch (error) {
      toast.error("Couldn't reset password");
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      {/* Illustration */}
      {showIllustration && (
        <img
          className="md:w-80"
          src="/assets/svg/change-password-illustration.svg"
          alt="Password reset illustration"
        />
      )}
      <div className="flex flex-col gap-3 items-center w-full">
        <h3>Change password</h3>
        <Form {...form}>
          <form
            className="flex flex-col gap-3 w-full"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {/* New password */}
            <FormField
              control={form.control}
              name="newPassword"
              defaultValue=""
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      placeholder="New password"
                      type="password"
                      autoComplete="new-password"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Confirm password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              defaultValue=""
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      placeholder="Confirm new password"
                      type="password"
                      autoComplete="off"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Submit */}
            <Button disabled={isPending} type="submit" className="w-full">
              {isPending && <Loader className="mr-2" />} Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
