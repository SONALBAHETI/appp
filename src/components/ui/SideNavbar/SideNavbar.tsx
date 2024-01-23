"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface Field {
  fields: string;
  nevigationLink: string;
}

interface SideNavbarProps {
  data: Field[];
}

export default function SideNavbar({ data }: SideNavbarProps) {
  const pathname = usePathname();

  return (
    <div className="fixed top-4 left-4 bottom-4 bg-white p-4 rounded-xl shadow-md border  flex flex-col justify-between w-64">
      <ul className="space-y-6">
        {data.map((item, index) => (
          <li
            className={`${
              pathname === item.nevigationLink
                ? "bg-[#E8F3F3] text-[#349997] font-bold"
                : "hover:bg-[#E8F3F3] hover:text-[#349997] hover:font-bold"
            } transition duration-300 ease-in-out py-3 px-5 rounded-xl cursor-pointer font-medium mt-5`}
            key={index}
          >
            <Link href={item.nevigationLink ? item.nevigationLink : "/"}>
              {item.fields}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
