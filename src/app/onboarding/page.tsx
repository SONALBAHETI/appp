import OnboardingForm from "@/components/onboarding/OnboardingForm";

export default function OnboardingPage() {
  return (
    <div className="flex w-full flex-col md:flex-row">
      {/* Left Column */}
      <div className="flex-1 md:max-w-xl">
        {/* Onboarding Form */}
        <OnboardingForm />
      </div>

      {/* Right Column */}
      <div className="flex-1 hidden md:block">
        {/* Illustration */}
        <p className="text-center">Scholarnetics Forever!</p>
      </div>
    </div>
  );
}
