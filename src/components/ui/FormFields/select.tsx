import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface SelectDropdownProps {
  field: {
    value: string;
    onChange: (newValue: string) => void;
  };
  options: string[];
  placeholder: string;
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({
  field,
  options,
  placeholder,
}) => {
  return (
    <Select
      value={field.value}
      onValueChange={(e) => {
        field.onChange(e);
      }}
    >
      <SelectTrigger
        className={cn(
          "flex h-12 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-600 disabled:cursor-not-allowed disabled:opacity-50"
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          {options.map((value, index) => (
            <SelectItem key={index} value={value}>
              {value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

SelectDropdown.displayName = "select";

export { SelectDropdown };
