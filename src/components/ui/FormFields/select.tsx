import * as React from "react";
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

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  containerClassName?: string;
  options: string[];
}

const SelectDropdown = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, containerClassName, options, placeholder, ...props }, ref) => {
    return (
      <Select>
        <SelectTrigger
          className={cn(
            "flex h-12 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-600 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
        >
          <SelectValue placeholder={placeholder} className="text-gray-400" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option, index) => (
              <SelectItem key={index} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }
);
SelectDropdown.displayName = "select";

export { SelectDropdown };
