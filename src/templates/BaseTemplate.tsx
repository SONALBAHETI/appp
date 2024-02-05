import { cn } from "@/lib/utils";

export default function BaseTemplate({
  children,
  className,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <main
      className={cn(
        "flex flex-col gap-2 page-width min-h-screen p-4 md:p-8",
        className
      )}
    >
      {children}
    </main>
  );
}
