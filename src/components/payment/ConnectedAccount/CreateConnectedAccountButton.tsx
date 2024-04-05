"use client";

import { useCreateStripeConnectedAccountMutation } from "@/api/payment";
import Loader from "@/components/ui/Loader";
import { Button, ButtonProps } from "@/components/ui/button";
import { ICreateStripeConnectedAccountResponse } from "@/interfaces/payment";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { forwardRef } from "react";
import { toast } from "react-toastify";
import { OnboardingRefreshUrl } from "./ContinueOnboardingButton";

interface ICreateConnectedAccountButtonProps extends ButtonProps {
  returnUrl: string;
}

const CreateConnectedAccountButton = forwardRef<
  HTMLButtonElement,
  ICreateConnectedAccountButtonProps
>(({ returnUrl, children, ...props }, ref) => {
  const createStripeConnectedAccountMutation =
    useCreateStripeConnectedAccountMutation();
  const router = useRouter();

  const createConnectedAccount = async () => {
    try {
      const response = (await createStripeConnectedAccountMutation.mutateAsync({
        returnUrl,
        refreshUrl: OnboardingRefreshUrl,
      })) as ICreateStripeConnectedAccountResponse;
      router.push(response.onboardingUrl);
    } catch (error) {
      console.log(error); /** @todo log error properly */
      if (error instanceof AxiosError) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <Button ref={ref} {...props} onClick={createConnectedAccount}>
      {createStripeConnectedAccountMutation.isPending && (
        <Loader className="mr-2" />
      )}
      {children}
    </Button>
  );
});

export default CreateConnectedAccountButton;
