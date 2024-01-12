import Icon, { IconType } from "@/components/ui/Icon";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const componentVariants = cva(
  "bg-accent-2 text-accent-2-foreground flex items-center justify-center",
  {
    variants: {
      size: {
        default: "w-12 h-12",
        sm: "w-8 h-8",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const iconVariants = cva("", {
  variants: {
    size: {
      default: "mb-1",
      sm: "mb-[0.1rem]",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const SIZES = {
  default: 28,
  sm: 20,
};

export interface IScottieProfilePicProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof componentVariants>,
    VariantProps<typeof iconVariants> {}

export default function ScottieProfilePic({
  size,
  className,
}: IScottieProfilePicProps) {
  return (
    <Avatar className={cn(componentVariants({ size, className }))}>
      <Icon
        type={IconType.BOT}
        size={size ? SIZES[size] : SIZES.default}
        className={cn(iconVariants({ size }))}
      />
    </Avatar>
  );
}
