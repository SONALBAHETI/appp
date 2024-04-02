import PlanCard from "./PlanCard";
import PlanBenefits, { PlanBenefitItem } from "./PlanBenefits";
import CheckoutButton from "../payment/Checkout/CheckoutButton";

interface IClinicianPlanProps {
  price: number;
  interval: "month" | "year";
  offer?: string;
}

const monthlyPriceId =
  process.env.NEXT_PUBLIC_STRIPE_CLINICIAN_MONTHLY_SUBSCRIPTION_PRICE_ID;
const yearlyPriceId =
  process.env.NEXT_PUBLIC_STRIPE_CLINICIAN_ANNUAL_SUBSCRIPTION_PRICE_ID;

export default function ClinicianPlan({
  price,
  interval,
  offer,
}: IClinicianPlanProps) {
  if (!monthlyPriceId || !yearlyPriceId) {
    throw new Error("Missing Stripe price IDs in environment variables");
  }
  const priceId = interval === "month" ? monthlyPriceId : yearlyPriceId;

  return (
    <PlanCard
      title="Clinician"
      description="Perfect for clinicians seeking to enhance their clinical knowledge, build their skills, and network with other professionals."
      price={price}
      interval={interval}
      offer={offer}
    >
      <PlanBenefits>
        <PlanBenefitItem>24/7 platform access</PlanBenefitItem>
        <PlanBenefitItem>
          Unlimited connections with specialized mentors
        </PlanBenefitItem>
        <PlanBenefitItem>Unlimited networking</PlanBenefitItem>
        <PlanBenefitItem>
          Free access to exclusive webinars and continuing education
        </PlanBenefitItem>
        <PlanBenefitItem>
          Personalized notes and goal tracking functions
        </PlanBenefitItem>
        <PlanBenefitItem>Securely share and upload documents</PlanBenefitItem>
        <PlanBenefitItem>Mentorship and learning analytics</PlanBenefitItem>
      </PlanBenefits>
      <CheckoutButton
        priceId={priceId}
        successUrl="http://localhost:3000" /** @todo this is temporary */
        cancelUrl="http://localhost:3000/settings/account/subscription" /** @todo this is temporary */
        className="w-full"
      >
        Join as a clinician
      </CheckoutButton>
    </PlanCard>
  );
}
