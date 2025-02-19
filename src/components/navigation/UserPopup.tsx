"use client";

import { useUserProfileQuery } from "@/api/profileSettings";
import Loader from "@/components/ui/Loader";
import Icon, { IconType } from "@/components/ui/Icon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { useLogoutMutation } from "@/api/auth";
import { Button } from "../ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import React from "react";
import { AppRoutes } from "@/constants/appRoutes";
import ProfilePicture from "../ui/ProfilePicture";

const QuickLinks = [
  {
    name: "Personal Settings",
    href: AppRoutes.Settings.Profile.path,
    icon: IconType.SETTINGS,
  },
  {
    name: "Appointment Settings",
    href: AppRoutes.Settings.Appointment.path,
    icon: IconType.USER,
  },
];

export default function UserPopup() {
  const userProfileQuery = useUserProfileQuery();
  const mutationLogout = useLogoutMutation();
  const queryClient = useQueryClient();
  const router = useRouter();

  const onLogout = async () => {
    try {
      await mutationLogout.mutateAsync(undefined);
      queryClient.invalidateQueries();
      router.push(AppRoutes.Auth.Signin.path);
    } catch (error) {
      toast.error("Couldn't logout");
    }
  };

  const profile = userProfileQuery.data?.profile;

  return (
    <Popover>
      <PopoverTrigger>
        <ProfilePicture
          userName={`${profile?.firstName}${profile?.lastName}`}
          profilePic={profile?.picture}
          loading={userProfileQuery.isPending}
          className="w-12 h-12"
        />
      </PopoverTrigger>
      <PopoverContent side="bottom" align="end" className="p-4">
        <div className="flex flex-col">
          {QuickLinks.map((link) => (
            <React.Fragment key={link.href}>
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center gap-4 hover:bg-muted rounded-md p-4"
              >
                <Icon name={link.icon} type={link.icon} />
                <span className="text-sm">{link.name}</span>
              </Link>
              <div className="px-4">
                <Separator />
              </div>
            </React.Fragment>
          ))}
          <Button
            className="justify-start py-7"
            variant="ghost"
            onClick={onLogout}
            disabled={mutationLogout.isPending}
          >
            {mutationLogout.isPending ? (
              <Loader />
            ) : (
              <Icon type={IconType.BACK} className="mr-4" />
            )}{" "}
            Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
