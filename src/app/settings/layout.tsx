import Icon, { IconType } from "@/components/ui/Icon";
import NavLink from "@/components/ui/NavLink/NavLink";
import { AppRoutes } from "@/constants/appRoutes";
import { Role } from "@/constants/user";
import { ResumeProvider } from "@/context/ResumeContext";
import BaseTemplate from "@/templates/BaseTemplate";
import Link from "next/link";

const settingTabs: INavLink[] = [
  {
    label: "Profile",
    link: AppRoutes.Settings.Profile.path,
  },
  {
    label: "Account",
    link: AppRoutes.Settings.Account.path,
  },
  {
    label: "Appointment",
    link: AppRoutes.Settings.Appointment.path,
    roles: [Role.UNVERIFIED_MENTOR, Role.MENTOR],
  },
  {
    label: "Transactions",
    link: AppRoutes.Settings.Transactions.path,
  },
  {
    label: "Refer & Earn",
    link: AppRoutes.Settings.ReferAndEarn.path,
  },
  {
    label: "Feedback & Support",
    link: AppRoutes.Settings.FeedbackSupport.path,
  },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BaseTemplate className="flex flex-col min-h-screen">
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <Icon type={IconType.SETTINGS} size={30} />
          <h2>Settings</h2>
        </div>
        <Link
          className="flex gap-2 items-center font-semibold"
          href={AppRoutes.Root.path}
        >
          <Icon type={IconType.BACK} size={22} /> Back to Dashboard
        </Link>
      </div>
      <div className="flex gap-8 text-lg mt-4">
        {settingTabs.map((tab) => (
          <NavLink href={tab.link} key={tab.link} roles={tab.roles}>
            {tab.label}
          </NavLink>
        ))}
      </div>
      <div className="mt-4 flex-grow flex flex-col">
        <ResumeProvider>{children}</ResumeProvider>
      </div>
    </BaseTemplate>
  );
}
