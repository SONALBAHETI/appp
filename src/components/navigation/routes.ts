import { AppRoutes } from "@/constants/appRoutes";
import { IconType } from "../ui/Icon";

interface IRoute {
  path: string;
  icon: IconType;
}

export const NAV_ROUTES: { [key: string]: IRoute } = {
  DASHBOARD: {
    path: AppRoutes.Dashboard.path,
    icon: IconType.DASHBOARD,
  },
  CHAT: {
    path: AppRoutes.Chat.path,
    icon: IconType.CHAT,
  },
  CHATBOT: {
    path: AppRoutes.Chatbot.path,
    icon: IconType.BOT,
  },
  NOTES: {
    path: AppRoutes.Notes.path,
    icon: IconType.NOTE,
  },
};