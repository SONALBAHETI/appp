import MainNavigation from "@/components/navigation/MainNavigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pl-16">
      <MainNavigation />
      {children}
    </div>
  );
}
