import Icon, { IconType } from "../ui/Icon";

export function PlanBenefitItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 py-2 text-faded text-left text-sm">
      <Icon type={IconType.SINGLE_CHECK} size={18} className="text-primary" />
      <div className="flex-1">{children}</div>
    </div>
  );
}

export default function PlanBenefits({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-col divide-y text-left">{children}</div>;
}
