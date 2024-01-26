import MainNavigation from "@/components/navigation/MainNavigation";
import { SocketProvider } from "@/providers/SocketProvider";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pl-16">
      <SocketProvider>
        <MainNavigation />
        <div className="bg-gray-100 flex flex-col min-h-screen">{children}</div>
      </SocketProvider>
    </div>
  );
}
