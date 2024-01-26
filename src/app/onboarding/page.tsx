import OnboardingForm from "@/components/onboarding/OnboardingForm";
import TwoColumnsPageTemplate, {
  LeftColumn,
  RightColumn,
} from "@/templates/TwoColumnsPageTemplate";

export default function OnboardingPage() {
  return (
    <TwoColumnsPageTemplate>
      <LeftColumn>
        <OnboardingForm />
      </LeftColumn>
      <RightColumn>
        <img
          src="/assets/svg/onboarding-form-illustration.svg"
          alt="Sign In Illustration"
        />
      </RightColumn>
    </TwoColumnsPageTemplate>
  );
}
