"use client";

import { useConnectedAccountLoginLinkMutation } from "@/api/payment";
import Loader from "@/components/ui/Loader";
import { Button, ButtonProps } from "@/components/ui/button";
import { ICreateConnectedAccountLoginLinkResponse } from "@/interfaces/payment";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { forwardRef } from "react";
import { toast } from "react-toastify";

interface IConnectedAccountLoginButtonProps extends ButtonProps {}

const ConnectedAccountLoginButton = forwardRef<
  HTMLButtonElement,
  IConnectedAccountLoginButtonProps
>(({ children, ...props }, ref) => {
  const connectedAccountLoginLinkMutation =
    useConnectedAccountLoginLinkMutation();
  const router = useRouter();

  const createOnboardingLink = async () => {
    try {
      const response = (await connectedAccountLoginLinkMutation.mutateAsync(
        undefined
      )) as ICreateConnectedAccountLoginLinkResponse;
      router.push(response.loginUrl);
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
      {connectedAccountLoginLinkMutation.isPending && (
        <Loader className="mr-2" />
      )}
      {children}
    </Button>
  );
});

export default ConnectedAccountLoginButton;
