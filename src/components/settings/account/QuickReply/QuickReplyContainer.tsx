import { cn } from "@/lib/utils";

export default function QuickReplyContainer({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-lg bg-secondary p-5 flex flex-col", className)}>
      {children}
    </div>
  );
}
