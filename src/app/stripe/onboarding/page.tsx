"use client";

import { useConnectedAccountOnboardingLinkMutation } from "@/api/payment";
import { OnboardingRefreshUrl } from "@/components/payment/ConnectedAccount/ContinueOnboardingButton";
import Loader from "@/components/ui/Loader";
import { getFullRoute } from "@/constants/appRoutes";
import { ICreateConnectedAccountOnboardingLinkResponse } from "@/interfaces/payment";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function StripeOnboardingPage() {
  const connectedAccountOnboardingLinkMutation =
    useConnectedAccountOnboardingLinkMutation();
  const router = useRouter();
  const initialized = useRef(false);

  const createOnboardingLink = async () => {
    try {
      const response =
        (await connectedAccountOnboardingLinkMutation.mutateAsync({
          returnUrl: getFullRoute(),
          refreshUrl: OnboardingRefreshUrl,
        })) as ICreateConnectedAccountOnboardingLinkResponse;
      router.push(response.onboardingUrl);
    } catch (error) {}
  };

  useEffect(() => {
    // to make sure that createOnboardingLink is called only once even in strict mode
    if (!initialized.current) {
      initialized.current = true;
      createOnboardingLink();
    }
  }, []);

  return (
    <div className="full-screen absolute-center flex-col gap-3">
      {connectedAccountOnboardingLinkMutation.isPending && (
        <Loader className="mr-2" />
      )}
      {connectedAccountOnboardingLinkMutation.isError ? (
        <p>Something went wrong</p>
      ) : (
        <p>Redirecting...</p>
      )}
    </div>
  );
}
