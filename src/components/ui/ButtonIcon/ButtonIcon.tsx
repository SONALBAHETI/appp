import { ButtonProps } from "@/components/ui/button";
import { IconType } from "@/components/ui/Icon/type";

import { Button } from "@/components/ui/button";
import React from "react";
import Icon from "@/components/ui/Icon";

export interface IButtonIconProps extends ButtonProps {
  iconType: IconType;
  iconSize?: number;
}

const ButtonIcon = React.forwardRef<HTMLButtonElement, IButtonIconProps>(
  ({ iconType, iconSize = 18, size = "icon", ...props }, ref) => {
    return (
      <Button size={size} {...props} ref={ref}>
        <Icon type={iconType} size={iconSize} />
      </Button>
    );
  }
);

export default ButtonIcon;
