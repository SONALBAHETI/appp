"use client";

import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps extends LinkProps {
  children: React.ReactNode;
  activeClassName?: string;
  inactiveClassName?: string;
  className?: string;
}

export default function NavLink({
  children,
  className,
  activeClassName = "border-b-2 border-accent-2",
  inactiveClassName = "text-faded hover:text-foreground",
  href,
  ...props
}: NavLinkProps) {
  const pathname = usePathname();
  const active = pathname.startsWith(href.toString());
  return (
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
}
