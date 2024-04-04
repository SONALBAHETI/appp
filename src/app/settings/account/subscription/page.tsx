import CreditsCheckoutButton from "@/components/payment/Checkout/CreditsCheckoutButton";
import CreditBalance from "@/components/payment/CreditBalance";
import CustomerPortalButton from "@/components/payment/CustomerPortal/CustomerPortalButton";
import UserSubscriptionPlan from "@/components/payment/UserSubscriptionPlan";
import PlansWrapper from "@/components/plans/PlansWrapper";
import { Separator } from "@/components/ui/separator";
import { AppRoutes, getFullRoute } from "@/constants/appRoutes";

export default function SubscriptionPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col-reverse gap-4 md:flex-row items-start md:justify-between">
        <div className="flex flex-col gap-2">
          <h4>Credit balance</h4>
          <div className="flex items-center gap-3">
            <CreditBalance />
            <CreditsCheckoutButton />
          </div>
        </div>
        <CustomerPortalButton
          variant="secondary"
          className="self-center md:self-start"
          returnUrl={getFullRoute(AppRoutes.Settings.Account.Subscription.path)}
        >
          Manage Subscription & Invoices
        </CustomerPortalButton>
      </div>
      <Separator />
      <div className="flex flex-col gap-2">
        <h4>Subscription plan</h4>
        <UserSubscriptionPlan />
      </div>
      <PlansWrapper />
    </div>
  );
}
