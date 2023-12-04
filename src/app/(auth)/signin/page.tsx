import SignInForm from "@/components/auth/signin-form";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center p-24">
      <div className="flex-1 max-w-xl">
        <SignInForm />
      </div>
      <p className="flex-1 text-center">Scholarnetics Forever!</p>
    </main>
  );
}