import { SideNavbar } from "@/components/ui/SideNavbar";
import { Card, CardContent } from "@/components/ui/card";

const sideNavLinks: INavLink[] = [
  {
    label: "Availability",
    link: "/settings/appointment/availability",
  },
  {
    label: "Calendar sync",
    link: "/settings/appointment/calendar-sync",
  },
];

export default function AppointmentSettingsLayout({
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
