import ConnectedAccount from "@/components/payment/ConnectedAccount";
import { AppRoutes, getFullRoute } from "@/constants/appRoutes";

export default function PayoutPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h4>Manage payouts</h4>
        <p className="text-faded">
          Scholarnetics360 partners with <b>Stripe</b> for managing payouts.
        </p>
      </div>
      <ConnectedAccount
        returnUrl={getFullRoute(AppRoutes.Settings.Account.Payout.path)}
      />
    </div>
  );
}
