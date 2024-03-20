"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { SignUpForm } from "./validation";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { toast } from "react-toastify";

import { useAuth } from "@/hooks/useAuth";
import { useSignUpWithEmailPasswordMutation } from "@/api/auth";
import { ISignUpWithEmailPasswordResponse } from "@/interfaces/auth";
import { AxiosError } from "axios";

interface SignupFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function SignupForm({ className, ...props }: SignupFormProps) {
  const mutationSignUpWithEmailPassword = useSignUpWithEmailPasswordMutation();
  const { saveAuth } = useAuth();
  const router = useRouter();

  const form = useForm<SignUpForm>({
    resolver: zodResolver(SignUpForm),
    mode: "onSubmit",
  });

  async function onSubmit(data: SignUpForm) {
    try {
      const response = (await mutationSignUpWithEmailPassword.mutateAsync(
        data
      )) as ISignUpWithEmailPasswordResponse;
      saveAuth({
        userId: response.userId,
        accessToken: response.accessToken,
      });
      router.push("/verification/email/request");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.message);
      }
    }
  }

  const { isPending } = mutationSignUpWithEmailPassword;

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <FormField
              control={form.control}
              name="firstName"
              defaultValue=""
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="First Name"
                      autoCapitalize="words"
                      autoComplete="given-name"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              defaultValue=""
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Last Name"
                      autoCapitalize="words"
                      autoComplete="family-name"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Min. 8 characters"
                    type="password"
                    autoComplete="password"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{" "}
            Create My Account
          </Button>
        </form>
      </Form>
    </div>
  );
}
