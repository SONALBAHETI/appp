export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen items-center px-8 md:px-12 lg:px-24">
      {children}
    </main>
  );
}
