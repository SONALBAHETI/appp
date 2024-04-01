import { SideNavbar } from "@/components/ui/SideNavbar";
import { Card, CardContent } from "@/components/ui/card";
import { Role } from "@/constants/user";

const sideNavLinks: INavLink[] = [
  {
    label: "Notifications",
    link: "/settings/account/notifications",
  },
  {
    label: "Quick replies",
    link: "/settings/account/quick-replies",
    roles: [Role.MENTOR],
  },
  {
    label: "Change Password",
    link: "/settings/account/change-password",
  },
  {
    label: "Delete Account",
    link: "/settings/account/delete",
  },
];

export default function AccountSettingsLayout({
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
