"use client";

import { useSubscriptionCheckoutMutation } from "@/api/payment";
import Loader from "@/components/ui/Loader";
import { Button, ButtonProps } from "@/components/ui/button";
import { ICheckoutResponse } from "@/interfaces/payment";
import { useRouter } from "next/navigation";
import { forwardRef } from "react";
import { toast } from "react-toastify";

interface ISubscriptionCheckoutButtonProps extends ButtonProps {
  priceId: string;
  successUrl: string;
  cancelUrl: string;
}

const SubscriptionCheckoutButton = forwardRef<HTMLButtonElement, ISubscriptionCheckoutButtonProps>(
  ({ priceId, successUrl, cancelUrl, children, ...props }, ref) => {
    const router = useRouter();
    const subscriptionCheckoutMutation = useSubscriptionCheckoutMutation();

    const checkout = async () => {
      try {
        const response = (await subscriptionCheckoutMutation.mutateAsync({
          priceId,
          successUrl,
          cancelUrl,
        })) as ICheckoutResponse;
        // navigate to session url
        router.push(response.sessionUrl);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    };

    return (
      <Button ref={ref} {...props} onClick={checkout}>
        {subscriptionCheckoutMutation.isPending && <Loader className="mr-2" />}
        {children}
      </Button>
    );
  }
);

export default SubscriptionCheckoutButton;
