import SignUpForm from "@/components/auth/signup-form";

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center p-24">
      <div className="flex-1 max-w-xl">
        <SignUpForm />
      </div>
      <p className="flex-1 text-center">Scholarnetics Forever!</p>
    </main>
  );
}
