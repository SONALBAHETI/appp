"use client";

import React from "react";
import { Card, CardContent } from "../card";
import NavLink from "../NavLink/NavLink";

interface SideNavbarProps {
  links: INavLink[];
}

export default function SideNavbar({ links }: SideNavbarProps) {
  return (
    <Card className="shadow-md h-full">
      <CardContent className="mt-6">
        <ul className="flex flex-col gap-2 sticky top-5">
          {links.map((item, index) => (
            <NavLink
              key={index}
              className="w-full p-4 rounded-xl"
              activeClassName="text-accent-2 bg-accent-2/10 font-bold"
              inactiveClassName="hover:bg-muted transition duration-300 ease-in-out"
              href={item.link}
            >
              {item.label}
            </NavLink>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
