import SignInWithGoogle from "@/components/auth/SignInWithGoogle/SignInWithGoogle";
import SignUpForm from "@/components/auth/SignupForm";
import { AppRoutes } from "@/constants/appRoutes";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1>Sign up</h1>
        <p className="mt-1 font-light">
          Create a new Scholarnetics account to get started.
        </p>
      </div>
      <SignInWithGoogle />
      <div className="text-center text-muted-foreground text-sm">OR</div>
      <SignUpForm />
      <p className="font-light">
        Already a member? <Link className="link" href={AppRoutes.Auth.Signin.path}>Sign in</Link>
      </p>
    </div>
  );
}
