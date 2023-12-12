"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { SignInFormSchema, SignInFormValues } from "./validation";

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

import { useApi } from "@/hooks/useApi";
import { useAuth } from "@/hooks/useAuth";

interface SignInFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function SignInForm({ className, ...props }: SignInFormProps) {
  const { saveAuth } = useAuth();
  const [signInWithEmailPassword, isLoading] = useApi({
    url: "/api/v1/auth/login/email-password",
    method: "POST",
  });
  const router = useRouter();

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(SignInFormSchema),
    mode: "onSubmit",
  });

  async function onSubmit(data: SignInFormValues) {
    try {
      const { response, result } = await signInWithEmailPassword({
        body: JSON.stringify(data),
      });
      console.log(result);
      const { user, tokens } = result;
      if (response.ok && user && tokens) {
        saveAuth({
          userId: user.id,
          accessToken: tokens.access.token,
        });
        router.push("/");
      } else {
        toast.error(
          result?.message || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      console.error(error);
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
                    disabled={isLoading}
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
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{" "}
            Sign In
          </Button>
        </form>
      </Form>
    </div>
  );
}