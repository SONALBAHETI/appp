interface ITabItemProps {
  key: number;
  name: string;
  isActive: boolean;
  onClick: () => void;
}

export default function TabItem({ name, isActive, onClick }: ITabItemProps) {
  const activeClass = isActive ? "bg-accent-2 text-accent-2-foreground" : "";
  return (
    <button
      className={`cursor-pointer ${activeClass} rounded-lg px-4 py-2 capitalize flex-1`}
      onClick={onClick}
      aria-label={name}
      role="tab"
      aria-selected={isActive ? "true" : "false"}
      aria-controls={`tab-panel-${name}`}
    >
      {name}
    </button>
  );
}
