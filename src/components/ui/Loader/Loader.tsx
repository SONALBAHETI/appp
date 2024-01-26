import { ElementRef, forwardRef } from "react";
import Icon, { IconType } from "../Icon";
import { LucideIcon } from "lucide-react";
import { IIconProps } from "../Icon/Icon";
import { cn } from "@/lib/utils";

const Loader = forwardRef<ElementRef<LucideIcon>, Omit<IIconProps, "type">>(
  ({ className, size = 18, ...props }, ref) => {
    return (
      <Icon
        ref={ref}
        type={IconType.LOADING}
        size={size}
        className={cn("animate-spin", className)}
        {...props}
      />
    );
  }
);

export default Loader;
