"use client";

import { useCreditsCheckoutMutation, useStripeEnabledQuery } from "@/api/payment";
import Icon, { IconType } from "@/components/ui/Icon";
import Loader from "@/components/ui/Loader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Input } from "@/components/ui/input";
import { ICheckoutResponse } from "@/interfaces/payment";
import { AddCreditsFormSchema } from "@/validation/addCreditsForm.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function CreditsCheckoutButton() {
  const stripeEnabledQuery = useStripeEnabledQuery();
  const creditsCheckoutMutation = useCreditsCheckoutMutation();

  const form = useForm<AddCreditsFormSchema>({
    resolver: zodResolver(AddCreditsFormSchema),
  });

  const creditsQuantity = form.watch("quantity") || 25;

  const router = useRouter();

  if (!stripeEnabledQuery.data?.enabled) {
    return null;
  }

  const onSubmit = async (data: AddCreditsFormSchema) => {
    try {
      const response = (await creditsCheckoutMutation.mutateAsync({
        quantity: data.quantity,
        successUrl: window.location.href,
        cancelUrl: window.location.href,
      })) as ICheckoutResponse;
      router.push(response.sessionUrl);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Icon type={IconType.WALLET} className="mr-2" /> Buy credits
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Add to credit balance</DialogTitle>
              <DialogDescription>
                Select the number of credits to purchase
              </DialogDescription>
              <div className="py-4">
                <FormField
                  control={form.control}
                  name="quantity"
                  defaultValue={25}
                  render={({ field: { onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>Credits to add</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={25}
                          max={500}
                          defaultValue={25}
                          step={5}
                          onChange={(e) =>
                            onChange(parseInt(e.target.value) || 0)
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </DialogHeader>
            <DialogFooter className="items-center gap-x-3">
              <p className="text-sm text-faded text-right">
                {creditsQuantity} credits = ${creditsQuantity * 0.2}
              </p>
              <Button
                type="submit"
                disabled={creditsCheckoutMutation.isPending}
              >
                {creditsCheckoutMutation.isPending && (
                  <Loader className="mr-2" />
                )}
                Continue
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
