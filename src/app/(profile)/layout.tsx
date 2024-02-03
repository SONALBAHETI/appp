import { SideNavbar } from "@/components/ui/SideNavbar";

const sideNavField = [
  {
    fields: "My information",
    navigationLink: "/my-information",
  },
  {
    fields: "Verification details ",
    navigationLink: "/verify-document",
  },
  {
    fields: "Bank details",
    navigationLink: "/bank-details",
  },
  {
    fields: "Certificated & Badges",
    navigationLink: "/certificated",
  },
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen items-center px-8 md:px-12 lg:px-24">
      <SideNavbar data={sideNavField}></SideNavbar>
      {children}
    </main>
  );
}
