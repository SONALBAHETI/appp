"use client";

import Icon from "../ui/Icon";
import { NAV_ROUTES } from "./routes";
import { usePathname, useRouter } from "next/navigation";

export default function MainNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const activeRouteClassName = "bg-nav-foreground text-nav rounded-r-full";
  return (
    <div className="fixed py-6 top-0 left-0 bottom-0 bg-nav text-nav-foreground">
      <div className="flex flex-col items-center pr-1">
        {Object.keys(NAV_ROUTES).map((key) => {
          const route = NAV_ROUTES[key];
          return (
            <div
              key={key}
              className={`p-4 ${
                pathname === route.path && activeRouteClassName
              }`}
            >
              <Icon
                type={route.icon}
                className="cursor-pointer"
                onClick={() => router.push(route.path)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
