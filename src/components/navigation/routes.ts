import { IconType } from "../ui/Icon";

interface IRoute {
  path: string;
  icon: IconType;
}

export const NAV_ROUTES: { [key: string]: IRoute } = {
  DASHBOARD: {
    path: "/dashboard",
    icon: IconType.DASHBOARD,
  },
  CHAT: {
    path: "/chat",
    icon: IconType.CHAT,
  },
  CHATBOT: {
    path: "/chatbot",
    icon: IconType.BOT,
  },
};
