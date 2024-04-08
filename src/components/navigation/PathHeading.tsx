"use client";

import { usePathname } from "next/navigation";
import { AppRoutes } from "@/constants/appRoutes";

const pathHeadingMap = new Map([
  [AppRoutes.Dashboard.path, "Dashboard"],
  [AppRoutes.Chat.path, "Your chats"],
  [AppRoutes.Chatbot.path, "Ask scottie anything!"],
  [AppRoutes.Notes.path, "Notes"],
  [AppRoutes.Matches.path, "All mentors"],
]);

const getMatchingPathRecursively: (pathname: string) => string | undefined = (
  pathname: string
) => {
  if (pathHeadingMap.has(pathname)) {
    return pathHeadingMap.get(pathname);
  } else {
    const lastSegmentRemoved = pathname.split("/").slice(0, -1).join("/");
    if (lastSegmentRemoved) {
      return getMatchingPathRecursively(lastSegmentRemoved);
    } else {
      return "";
    }
  }
};

interface IPathHeading extends React.HTMLAttributes<HTMLHeadingElement> {}

export default function PathHeading({ ...props }: IPathHeading) {
  const pathname = usePathname();
  const heading = getMatchingPathRecursively(pathname);

  return <h3 {...props}>{heading}</h3>;
}
