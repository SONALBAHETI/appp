import { SideNavbar } from "@/components/ui/SideNavbar";
import { Card, CardContent } from "@/components/ui/card";
import { AppRoutes } from "@/constants/appRoutes";
import { Role } from "@/constants/user";

const sideNavLinks: INavLink[] = [
  {
    label: "Notifications",
    link: AppRoutes.Settings.Account.Notifications.path,
  },
  {
    label: "Quick replies",
    link: AppRoutes.Settings.Account.QuickReplies.path,
    roles: [Role.MENTOR],
  },
  {
    label: "Subscription",
    link: AppRoutes.Settings.Account.Subscription.path,
    roles: [Role.MENTEE],
  },
  {
    label: "Payout",
    link: AppRoutes.Settings.Account.Payout.path,
    roles: [Role.MENTOR],
  },
  {
    label: "Change Password",
    link: AppRoutes.Settings.Account.ChangePassword.path,
  },
  {
    label: "Delete Account",
    link: AppRoutes.Settings.Account.Delete.path,
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
