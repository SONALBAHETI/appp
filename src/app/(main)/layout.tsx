import MainNavigation from "@/components/navigation/MainNavigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pl-16">
      <MainNavigation />
      <div className="bg-gray-100 flex flex-col min-h-screen">{children}</div>
    </div>
  );
}
