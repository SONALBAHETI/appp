"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface IComboboxProps {
  className?: string;
  value?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyPlaceholder?: string;
  options?: IToggleOption[];
  onChange?: (value: string) => void;
}

export default function Combobox({
  className,
  value,
  placeholder = "Select an option",
  searchPlaceholder = "Search",
  emptyPlaceholder = "No options found",
  options,
  onChange,
}: IComboboxProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            `justify-between ${!value ? "text-foreground/50" : ""}`,
            className
          )}
        >
          {value && options
            ? options.find((option) => option.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandEmpty>{emptyPlaceholder}</CommandEmpty>
          <CommandGroup>
            {options &&
              options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(_currentValue) => {
                    onChange?.(option.value === value ? "" : option.value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
