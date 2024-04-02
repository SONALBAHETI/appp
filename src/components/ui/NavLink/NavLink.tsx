"use client";

import ProtectedComponent from "@/components/access-control/ProtectedComponent";
import { Permission, Role } from "@/constants/user";
import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps extends LinkProps {
  children: React.ReactNode;
  activeClassName?: string;
  inactiveClassName?: string;
  className?: string;
  roles?: Role[]; // for any of the roles in this array, the link will be visible
  permissions?: Permission[]; // the link will be visible if the user has ALL of these permissions
}

export default function NavLink({
  children,
  className,
  activeClassName = "border-b-2 border-accent-2",
  inactiveClassName = "text-faded hover:text-foreground",
  href,
  roles = [],
  permissions = [],
  ...props
}: NavLinkProps) {
  const pathname = usePathname();
  const active = pathname.startsWith(href.toString());
  const isProtected = roles.length > 0 || permissions.length > 0;
  const renderLink = () => (
    <Link
      href={href}
      className={cn(
        `py-2 ${active ? activeClassName : inactiveClassName}`,
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
  if (isProtected) {
    return (
      <ProtectedComponent
        requiredPermissions={permissions}
        allowedRoles={roles}
      >
        {renderLink()}
      </ProtectedComponent>
    );
  }
  return renderLink();
}
