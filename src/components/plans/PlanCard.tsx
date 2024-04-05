interface IPlanCardProps {
  title: string;
  description: string;
  price?: number;
  interval?: "month" | "year";
  offer?: string;
  children?: React.ReactNode;
}

export default function PlanCard({
  title,
  description,
  price = 0,
  interval = "month",
  offer,
  children,
}: IPlanCardProps) {
  return (
    <div className="card rounded-xl shadow-none hover:shadow-lg bg-background/40 transition-shadow p-6 text-center flex flex-col items-center gap-3 max-w-sm relative">
      <h3 className="card-title">{title}</h3>
      <p className="text-faded text-sm">{description}</p>
      {/* Price */}
      <h1>
        ${price}
        <span className="text-base">/{interval}</span>
      </h1>
      {/* Plan offer */}
      {offer && (
        <div className="absolute -top-4 bg-primary text-primary-foreground px-3 py-1 text-sm rounded-lg">
          {offer}
        </div>
      )}
      {children}
    </div>
  );
}
