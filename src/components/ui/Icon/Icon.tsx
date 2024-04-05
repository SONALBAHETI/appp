import { forwardRef, ElementRef } from "react";

import { IconType } from "./type";
import {
  Plus,
  Heart,
  SendHorizonal,
  LucideProps,
  LucideIcon,
  MoreVertical,
  X,
  LayoutDashboard,
  MessageCircle,
  Bot,
  FileText,
  Loader2,
  Video,
  Settings,
  ArrowLeft,
  User,
  Share2,
  PhoneOff,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Check,
  CheckCheck,
  Bell,
  Trash2,
  PenLine,
  Copy,
  Zap,
  PartyPopper,
  Wallet,
} from "lucide-react";

function changeTypeToIconComponent(type: IconType) {
  switch (type) {
    case IconType.PLUS:
      return Plus;
    case IconType.SEND:
      return SendHorizonal;
    case IconType.HEART:
      return Heart;
    case IconType.MORE_VERTICAL:
      return MoreVertical;
    case IconType.X:
      return X;
    case IconType.DASHBOARD:
      return LayoutDashboard;
    case IconType.CHAT:
      return MessageCircle;
    case IconType.BOT:
      return Bot;
    case IconType.NOTE:
      return FileText;
    case IconType.LOADING:
      return Loader2;
    case IconType.VIDEO:
      return Video;
    case IconType.SETTINGS:
      return Settings;
    case IconType.BACK:
      return ArrowLeft;
    case IconType.USER:
      return User;
    case IconType.SHARE:
      return Share2;
    case IconType.ENDCALL:
      return PhoneOff;
    case IconType.MIC:
      return Mic;
    case IconType.MIC_OFF:
      return MicOff;
    case IconType.CAMERA:
      return Camera;
    case IconType.CAMERA_OFF:
      return CameraOff;
    case IconType.CHECK:
      return CheckCheck;
    case IconType.NOTIFICATION:
      return Bell;
    case IconType.TRASH:
      return Trash2;
    case IconType.EDIT:
      return PenLine;
    case IconType.COPY:
      return Copy;
    case IconType.ZAP:
      return Zap;
    case IconType.PARTYPOPPER:
      return PartyPopper;
    case IconType.SINGLE_CHECK:
      return Check;
    case IconType.WALLET:
      return Wallet;
    default:
      return Plus; // TODO: Choose default icon?
  }
}

export interface IIconProps extends LucideProps {
  type: IconType;
}

const Icon = forwardRef<ElementRef<LucideIcon>, IIconProps>(
  ({ type, ...props }, ref) => {
    const IconComponent = changeTypeToIconComponent(type);
    return <IconComponent {...props} ref={ref} />;
  }
);

export default Icon;
