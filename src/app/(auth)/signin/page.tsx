import SignInWithGoogle from "@/components/auth/SignInWithGoogle/SignInWithGoogle";
import SignInForm from "@/components/auth/SigninForm";
import TextLine from "@/components/ui/TextLine";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1>Sign in</h1>
        <p className="mt-2 text-sm font-light">
          Log in to your Scholarnetics account.
        </p>
      </div>
      <div>
        <SignInWithGoogle />
        <TextLine className="mt-2" text="or" />
      </div>
      <SignInForm />
      <div className="flex justify-between gap-2">
        <p className="font-light">
          Not registered yet? <Link className="link" href={"/signup"}>Create an account</Link>
        </p>
        <p className="font-light">
          <Link className="link" href={"/verification/password-reset/request"}>Forgot password?</Link>
        </p>
      </div>
    </div>
  );
}
