import SignInForm from "@/components/auth/SigninForm";

export default function SignInPage() {
  return (
    <div className="flex w-full flex-col md:flex-row">
      {/* Left Column */}
      <div className="flex-1 md:max-w-xl">
        {/* Sign In Form */}
        <SignInForm />
      </div>

      {/* Right Column */}
      <div className="flex-1 hidden md:block">
        {/* Illustration */}
        <p className="text-center">Scholarnetics Forever!</p>
      </div>
    </div>
  );
}
