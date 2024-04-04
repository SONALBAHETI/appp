"use client";

import { useConnectedAccountStatusQuery } from "@/api/payment";
import Loader from "@/components/ui/Loader";
import CreateConnectedAccountButton from "./CreateConnectedAccountButton";
import ContinueOnboardingButton from "./ContinueOnboardingButton";
import ConnectedAccountLoginButton from "./ConnectedAccountLoginButton";

export default function ConnectedAccount({ returnUrl }: { returnUrl: string }) {
  const connectedAccountStatusQuery = useConnectedAccountStatusQuery();

  if (connectedAccountStatusQuery.isPending) {
    return (
      <div className="flex flex-col p-4 items-center">
        <Loader />
      </div>
    );
  }

  if (connectedAccountStatusQuery.isError) {
    return <div>Something went wrong</div>;
  }

  const account = connectedAccountStatusQuery.data;

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-secondary rounded-lg px-4 py-10 absolute-center">
        {/* If not created, show button to create connected account */}
        {!account.created && (
          <div className="flex flex-col gap-4 items-center text-center">
            <div className="max-w-md">
              <h4>You need a connected account</h4>
              <p className="text-faded">
                To receive payouts, you must create and verify your connected
                account on Stripe.
              </p>
            </div>
            <CreateConnectedAccountButton
              className="w-max"
              returnUrl={returnUrl}
            >
              Create your connected account
            </CreateConnectedAccountButton>
          </div>
        )}

        {/* If created but not verified, show button to continue onboarding */}
        {account.created && !account.verified && (
          <div className="flex flex-col gap-4 items-center text-center">
            <div className="max-w-md">
              <h4>Your connected account is not verified</h4>
              <p className="text-faded">
                Continue onboarding on Stripe to verify your connected account.
              </p>
            </div>
            <ContinueOnboardingButton
              className="w-max"
              returnUrl={returnUrl}
            >
              Continue onboarding
            </ContinueOnboardingButton>
          </div>
        )}

        {/* If created and verified, show button to login to connected account */}
        {account.verified && (
          <div className="flex flex-col gap-4 items-center text-center">
            <div className="max-w-md">
              <h4>Your connected account is active!</h4>
              <p className="text-faded">
                Go to your connected account to view earnings, transactions, and
                more.
              </p>
            </div>
            <ConnectedAccountLoginButton className="w-max">
              Open connected account
            </ConnectedAccountLoginButton>
          </div>
        )}
      </div>
    </div>
  );
}
