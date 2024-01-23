import { cn } from "@/lib/utils";

interface ITextLineProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
}

export default function TextLine({
  text,
  className,
  ...props
}: ITextLineProps) {
  return (
    <div className={cn("flex items-center", className)} {...props}>
      <hr className="w-1/2 border-0 border-t" />
      <span className="mx-4 font-light text-muted-foreground">{text}</span>
      <hr className="w-1/2 border-0 border-t" />
    </div>
  );
}
