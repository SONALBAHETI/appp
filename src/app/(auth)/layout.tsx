import GoogleAuthProvider from "@/providers/GoogleAuthProvider";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen items-center px-8 md:px-12 lg:px-24">
      <GoogleAuthProvider>{children}</GoogleAuthProvider>
    </main>
  );
}
