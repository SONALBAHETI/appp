import { cn } from "@/lib/utils";

interface LeftColumnProps extends React.ComponentPropsWithoutRef<"div"> {}
interface RightColumnProps extends React.ComponentPropsWithoutRef<"div"> {}

export function LeftColumn({ children, className, ...props }: LeftColumnProps) {
  return (
    <div className={cn("flex-1 w-full md:max-w-lg", className)} {...props}>
      {children}
    </div>
  );
}

export function RightColumn({
  children,
  className,
  ...props
}: RightColumnProps) {
  return (
    <div
      className={cn(
        "flex-1 hidden md:flex md:flex-col md:items-center",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default function TwoColumnsPageTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex page-width min-h-screen items-center px-8 md:px-12 lg:px-24">
      <div className="flex w-full flex-col md:flex-row md:items-center">
        {children}
      </div>
    </main>
  );
}
