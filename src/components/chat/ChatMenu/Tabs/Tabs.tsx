import TabItem from "./TabItem";

interface ITabsProps {
  items: Array<string>;
  activeItem: string;
  onTabChange: (item: any) => void;
}

export default function Tabs({
  items = [],
  activeItem,
  onTabChange,
}: ITabsProps) {
  return (
    <nav className="bg-muted rounded-lg flex w-full">
      <ul role="tablist" className="flex w-full">
        {items.map((item, index) => (
          <TabItem
            key={index}
            name={item}
            isActive={item === activeItem}
            onClick={() => onTabChange(item)}
          />
        ))}
      </ul>
    </nav>
  );
}
