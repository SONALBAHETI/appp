import React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import "react-day-picker/dist/style.css";
import { DayPickerSingleProps } from "react-day-picker";

const DatePicker = React.forwardRef<
  React.ElementRef<typeof Calendar>,
  Omit<DayPickerSingleProps, "mode" | "captionLayout">
>(
  (
    {
      className,
      selected: selectedDate,
      fromYear = 1900,
      toYear = new Date().getFullYear(),
      ...props
    },
    ref
  ) => {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "flex items-center justify-between h-12 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-600 disabled:cursor-not-allowed disabled:opacity-50",
              !selectedDate && "text-muted-foreground"
            )}
          >
            <span>
              {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
            </span>
            <CalendarIcon className="h-4 w-4 ml-2" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            fromYear={fromYear}
            toYear={toYear}
            selected={selectedDate}
            initialFocus
            captionLayout="dropdown"
            mode="single"
            {...props}
          />
        </PopoverContent>
      </Popover>
    );
  }
);

export default DatePicker;
