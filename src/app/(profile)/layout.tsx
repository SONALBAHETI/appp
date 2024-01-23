import SideNavbar from "@/components/ui/SideNavbar/SideNavbar";

const sideNavField = [
  {
    fields: "Personal details",
    nevigationLink: "/personal-details",
  },
  {
    fields: "Verification details ",
    nevigationLink: "/verify-document",
  },
  {
    fields: "Bank details",
    nevigationLink: "/bank-details",
  },
  {
    fields: "Certificated & Badges",
    nevigationLink: "/certificated",
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
