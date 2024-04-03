"use client";

import { useConnectedAccountOnboardingLinkMutation } from "@/api/payment";
import Loader from "@/components/ui/Loader";
import { Button, ButtonProps } from "@/components/ui/button";
import { ICreateConnectedAccountOnboardingLinkResponse } from "@/interfaces/payment";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { forwardRef } from "react";
import { toast } from "react-toastify";

interface IContinueOnboardingButtonProps extends ButtonProps {
  returnUrl: string;
}

const ContinueOnboardingButton = forwardRef<
  HTMLButtonElement,
  IContinueOnboardingButtonProps
>(({ returnUrl, children, ...props }, ref) => {
  const connectedAccountOnboardingLinkMutation =
    useConnectedAccountOnboardingLinkMutation();
  const router = useRouter();

  const createOnboardingLink = async () => {
    try {
      const response =
        (await connectedAccountOnboardingLinkMutation.mutateAsync({
          returnUrl,
          refreshUrl: "http://localhost:3000", /** @todo change url */
        })) as ICreateConnectedAccountOnboardingLinkResponse;
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
    <Button ref={ref} {...props} onClick={createOnboardingLink}>
      {connectedAccountOnboardingLinkMutation.isPending && (
        <Loader className="mr-2" />
      )}
      {children}
    </Button>
  );
});

export default ContinueOnboardingButton;
