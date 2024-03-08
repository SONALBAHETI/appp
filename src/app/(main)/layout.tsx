import MainNavigation from "@/components/navigation/MainNavigation";
import TopBar from "@/components/navigation/TopBar";
import { SocketProvider } from "@/providers/SocketProvider";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pl-14">
      <SocketProvider>
        <MainNavigation />
        <div className="bg-secondary flex flex-col min-h-screen px-4 md:px-8 lg:px-10 max-w-screen-2xl mx-auto">
          <TopBar className="sticky top-0" />
          <div className="flex flex-col flex-grow">{children}</div>
        </div>
      </SocketProvider>
    </div>
  );
}
