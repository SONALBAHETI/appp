import Icon, { IconType } from "@/components/ui/Icon";
import NavLink from "@/components/ui/NavLink/NavLink";
import { ResumeProvider } from "@/context/ResumeContext";
import BaseTemplate from "@/templates/BaseTemplate";
import Link from "next/link";

const settingTabs = [
  {
    label: "Profile",
    link: "/settings/profile/personal-details",
  },
  {
    label: "Account",
    link: "/settings/account/quick-replies",
  },
  {
    label: "Appointment",
    link: "/settings/appointment/",
  },
  {
    label: "Transactions",
    link: "/settings/transactions/",
  },
  {
    label: "Refer & Earn",
    link: "/settings/refer-earn/",
  },
  {
    label: "Feedback & Support",
    link: "/settings/feedback-support/",
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
        <Link className="flex gap-2 items-center font-semibold" href="/">
          <Icon type={IconType.BACK} size={22} /> Back to Dashboard
        </Link>
      </div>
      <div className="flex gap-8 text-lg mt-4">
        {settingTabs.map((tab) => (
          <NavLink href={tab.link} key={tab.link}>
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
