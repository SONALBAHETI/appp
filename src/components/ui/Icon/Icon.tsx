import { forwardRef, ElementRef } from "react";

import { IconType } from "./type";
import {
  Plus,
  Heart,
  SendHorizonal,
  LucideProps,
  LucideIcon,
  MoreVertical,
  X
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
    default:
      return Plus; // TODO: Choose default icon?
  }
}

interface IIconProps extends LucideProps {
  type: IconType;
}

const Icon = forwardRef<ElementRef<LucideIcon>, IIconProps>(
  ({ type, ...props }, ref) => {
    const IconComponent = changeTypeToIconComponent(type);
    return <IconComponent {...props} ref={ref} />;
  }
);

export default Icon;
