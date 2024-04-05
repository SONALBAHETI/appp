"use client";

import {
  useCustomerPortalMutation,
  useStripeEnabledQuery,
} from "@/api/payment";
import Loader from "@/components/ui/Loader";
import { Button, ButtonProps } from "@/components/ui/button";
import { ICustomerPortalResponse } from "@/interfaces/payment";
import { useRouter } from "next/navigation";
import { forwardRef } from "react";
import { toast } from "react-toastify";

interface ICustomerPortalButtonProps extends ButtonProps {
  returnUrl: string;
}

const CustomerPortalButton = forwardRef<
  HTMLButtonElement,
  ICustomerPortalButtonProps
>(({ returnUrl, children, ...props }, ref) => {
  const stripeEnabledQuery = useStripeEnabledQuery();
  const customerPortalMutation = useCustomerPortalMutation();

  const router = useRouter();

  if (!stripeEnabledQuery.data?.enabled) {
    return null;
  }

  const openCustomerPortal = async () => {
    try {
      const response = (await customerPortalMutation.mutateAsync({
        returnUrl,
      })) as ICustomerPortalResponse;
      router.push(response.sessionUrl);
    } catch (error) {
      console.log(error); /** @todo log error properly */
      toast.error("Something went wrong");
    }
  };

  return (
    <Button ref={ref} {...props} onClick={openCustomerPortal}>
      {customerPortalMutation.isPending && <Loader className="mr-2" />}
      {children}
    </Button>
  );
});

export default CustomerPortalButton;
