import CreditsCheckoutButton from "@/components/payment/Checkout/CreditsCheckoutButton";
import CreditBalance from "@/components/payment/CreditBalance";
import UserSubscriptionPlan from "@/components/payment/UserSubscriptionPlan";
import Plans from "@/components/plans";
import { Separator } from "@/components/ui/separator";

export default function SubscriptionPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h4>Credit balance</h4>
        <div className="flex items-center gap-3">
          <CreditBalance />
          <CreditsCheckoutButton />
        </div>
      </div>
      <Separator />
      <div className="flex flex-col gap-2">
        <h4>Active subscription</h4>
        <UserSubscriptionPlan />
      </div>
      <Plans />
    </div>
  );
}
