import SignInWithGoogle from "@/components/auth/SignInWithGoogle/SignInWithGoogle";
import SignUpForm from "@/components/auth/SignupForm";

export default function SignUpPage() {
  return (
    <div className="flex w-full flex-col md:flex-row">
      {/* Left Column */}
      <div className="flex-1 flex flex-col gap-4 md:max-w-xl">
        {/* Sign Up Form */}
        <SignUpForm />
        <div className="text-center text-muted-foreground text-sm">OR</div>
        <SignInWithGoogle />
      </div>

      {/* Right Column */}
      <div className="flex-1 hidden md:block">
        {/* Illustration */}
        <p className="text-center">Scholarnetics Forever!</p>
      </div>
    </div>
  );
}
