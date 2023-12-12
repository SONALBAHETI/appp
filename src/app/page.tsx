import Logout from "@/components/auth/Logout";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center p-24">
      {/* Added here just for functionality, need to move this somewhere else */}
      <Logout />
    </main>
  );
}
