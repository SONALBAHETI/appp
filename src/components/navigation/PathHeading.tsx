"use client";

import { usePathname } from "next/navigation";
import { NAV_ROUTES } from "./routes";

const { DASHBOARD, CHAT, CHATBOT, NOTES } = NAV_ROUTES;

const pathHeadingMap = new Map([
  [DASHBOARD.path, "Dashboard"],
  [CHAT.path, "Your chats"],
  [CHATBOT.path, "Ask scottie anything!"],
  [NOTES.path, "Notes"],
]);

interface IPathHeading extends React.HTMLAttributes<HTMLHeadingElement> {}

export default function PathHeading({ ...props }: IPathHeading) {
  const pathname = usePathname();
  const heading = pathHeadingMap.get(pathname);

  return <h3 {...props}>{heading}</h3>;
}
