import { SideNavbar } from "@/components/ui/SideNavbar";
import { Card, CardContent } from "@/components/ui/card";
import { AppRoutes } from "@/constants/appRoutes";

const sideNavLinks: INavLink[] = [
  {
    label: "Personal Details",
    link: AppRoutes.Settings.Profile.PersonalDetails.path,
  },
  {
    label: "Verification Documents",
    link: AppRoutes.Settings.Profile.VerificationDocuments.path,
  },
  {
    label: "Bank Details",
    link: AppRoutes.Settings.Profile.BankDetails.path,
  },
  {
    label: "Certifications & Badges",
    link: AppRoutes.Settings.Profile.CertificationsAndBadges.path,
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
        <SideNavbar links={sideNavLinks} />
      </div>
      <div className="flex-grow">
        <Card className="shadow-md h-full">
          <CardContent className="mt-6">{children}</CardContent>
        </Card>
      </div>
    </div>
  );
}
