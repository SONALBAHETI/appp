"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker, Input } from "@/components/ui/FormFields";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CertificateFormSchema } from "./validation";
import Icon, { IconType } from "@/components/ui/Icon";
import Loader from "@/components/ui/Loader";

export interface AddCertificateDialogProps {
  onAddCertificate: (data: CertificateFormSchema) => void;
  className?: string;
  isLoading?: boolean;
}

export const AddCertificateDialog = React.forwardRef<
  React.ElementRef<typeof Dialog>,
  React.ComponentPropsWithoutRef<typeof Dialog> & AddCertificateDialogProps
>(({ className, onAddCertificate, isLoading, ...props }, ref) => {
  const form = useForm<CertificateFormSchema>({
    resolver: zodResolver(CertificateFormSchema),
    mode: "onSubmit",
  });

  async function onSubmit(data: CertificateFormSchema) {
    onAddCertificate(data);
  }

  return (
    <Dialog {...props}>
      <DialogTrigger asChild>
        <Button className={className} variant="accent">
          <Icon type={IconType.PLUS} size={18} className="mr-1" /> Add
          certificate
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a certificate</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
          >
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                defaultValue=""
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name of the certificate</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateOfIssue"
                render={({ field: { value, onChange, ...props } }) => (
                  <FormItem>
                    <FormLabel>Date of issue</FormLabel>
                    <FormControl>
                      <DatePicker
                        selected={value}
                        onSelect={onChange}
                        {...props}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="expirationDate"
                render={({ field: { value, onChange, ...props } }) => (
                  <FormItem>
                    <FormLabel>Expiration date (optional)</FormLabel>
                    <FormControl>
                      <DatePicker
                        selected={value}
                        onSelect={onChange}
                        {...props}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="submit" className="w-full">
                {isLoading && <Loader className="mr-2" />} Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
});
