"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import {
  SignInFormSchema,
  TSignInForm,
} from "../../../validation/signinForm.validation";

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
import { useSignInWithEmailPasswordMutation } from "@/api/auth";
import { AxiosError } from "axios";
import { useAuth } from "@/hooks/useAuth";
import { ISignInWithEmailPasswordResponse } from "@/interfaces/auth";

interface SignInFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function SignInForm({ className, ...props }: SignInFormProps) {
  const mutationSignInWithEmailPassword = useSignInWithEmailPasswordMutation();
  const router = useRouter();
  const { saveAuth } = useAuth();

  const form = useForm<TSignInForm>({
    resolver: zodResolver(SignInFormSchema),
    mode: "onSubmit",
  });

  async function onSubmit(data: TSignInForm) {
    try {
      const response = await mutationSignInWithEmailPassword.mutateAsync(data) as ISignInWithEmailPasswordResponse;
      saveAuth({
        userId: response.userId,
        accessToken: response.accessToken,
      });
      router.push("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
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
                    disabled={mutationSignInWithEmailPassword.isPending}
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
                    placeholder="Enter your password"
                    type="password"
                    autoComplete="password"
                    disabled={mutationSignInWithEmailPassword.isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={mutationSignInWithEmailPassword.isPending}
          >
            {mutationSignInWithEmailPassword.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}{" "}
            Sign In
          </Button>
        </form>
      </Form>
    </div>
  );
}
