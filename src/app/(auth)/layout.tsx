import GoogleAuthProvider from "@/providers/GoogleAuthProvider";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex page-width min-h-screen items-center px-8 md:px-12 lg:px-24">
      <div className="flex w-full flex-col md:flex-row md:items-center">
        {/* Left Column */}
        <GoogleAuthProvider>
          <div className="flex-1 w-full md:max-w-lg">
            {children}
          </div>
        </GoogleAuthProvider>

        {/* Right Column */}
        <div className="flex-1 hidden md:flex md:flex-col md:items-center">
          {/* Illustration */}
          <img src="/assets/svg/sign-in-illustration.svg" alt="Sign In Illustration" />
        </div>
      </div>
    </main>
  );
}
