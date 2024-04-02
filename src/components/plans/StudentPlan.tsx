import PlanCard from "./PlanCard";
import PlanBenefits, { PlanBenefitItem } from "./PlanBenefits";
import { Button } from "@/components/ui/button";
import CheckoutButton from "../payment/Checkout/CheckoutButton";

interface IStudentPlanProps {
  price: number;
  interval: "month" | "year";
  offer?: string;
}

const monthlyPriceId =
  process.env.NEXT_PUBLIC_STRIPE_STUDENT_MONTHLY_SUBSCRIPTION_PRICE_ID;
const yearlyPriceId =
  process.env.NEXT_PUBLIC_STRIPE_STUDENT_ANNUAL_SUBSCRIPTION_PRICE_ID;

export default function StudentPlan({
  price,
  interval,
  offer,
}: IStudentPlanProps) {
  if (!monthlyPriceId || !yearlyPriceId) {
    throw new Error("Missing Stripe price IDs in environment variables");
  }
  const priceId = interval === "month" ? monthlyPriceId : yearlyPriceId;
  return (
    <PlanCard
      title="Student"
      description="Ideal for students seeking to improve their clinical knowledge, polish manual skills, and secure employment."
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
        Join as a student
      </CheckoutButton>
    </PlanCard>
  );
}
