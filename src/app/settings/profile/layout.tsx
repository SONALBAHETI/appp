import { SideNavbar } from "@/components/ui/SideNavbar";
import { Card, CardContent } from "@/components/ui/card";

const sideNavField: INavLink[] = [
  {
    label: "Personal Details",
    link: "/settings/profile/personal-details",
  },
  {
    label: "Verification Documents",
    link: "/settings/profile/verification-documents",
  },
  {
    label: "Bank Details",
    link: "/settings/profile/bank-details",
  },
  {
    label: "Certifications & Badges",
    link: "/settings/profile/certifications-and-badges",
  },
];

export default function ProfileSettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 items-stretch flex-grow">
      <div className="w-[22%] flex-shrink-0">
        <SideNavbar links={sideNavField} />
      </div>
      <div className="flex-grow">
        <Card className="shadow-md h-full">
          <CardContent className="mt-6">{children}</CardContent>
        </Card>
      </div>
    </div>
  );
}
