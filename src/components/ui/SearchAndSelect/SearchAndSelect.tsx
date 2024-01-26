"use client";

import { cn } from "@/lib/utils";
import React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import Loader from "../Loader";
import { Badge } from "../badge";
import Icon, { IconType } from "../Icon";

const CommandGroupHeading = ({ isLoading = false, hasData = false }) => {
  return isLoading ? (
    <span className="flex gap-1 items-center">
      Suggestions <Loader size={16} />
    </span>
  ) : hasData ? (
    <span>Suggestions</span>
  ) : (
    <></>
  );
};

export interface ISearchAndSelectProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input> {
  isLoading?: boolean;
  suggestions?: string[];
  selectedSuggestions?: string[];
  onSelectedSuggestionsChange?: (selectedSuggestions: string[]) => void;
}

const SearchAndSelect = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  ISearchAndSelectProps
>(
  (
    {
      className,
      isLoading = false,
      suggestions = [],
      selectedSuggestions = [],
      onSelectedSuggestionsChange,
      value,
      ...props
    },
    ref
  ) => {
    return (
      <div>
        <Command>
          <CommandInput
            className={cn("w-full", className)}
            value={value}
            ref={ref}
            {...props}
          />
          {value && (
            <CommandList>
              <CommandEmpty>
                {isLoading ? (
                  <span className="flex items-center justify-center gap-1">
                    <Loader />
                    Loading suggestions...
                  </span>
                ) : (
                  "No results found"
                )}
              </CommandEmpty>
              <CommandGroup
                heading={
                  <CommandGroupHeading
                    isLoading={isLoading}
                    hasData={suggestions.length > 0}
                  />
                }
              >
                {suggestions.map((suggestion) => (
                  <CommandItem
                    key={suggestion}
                    onSelect={() => {
                      if (!selectedSuggestions.includes(suggestion)) {
                        onSelectedSuggestionsChange?.([
                          ...selectedSuggestions,
                          suggestion,
                        ]);
                      }
                    }}
                  >
                    {suggestion}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          )}
        </Command>
        <div className="mt-1 flex gap-1 flex-wrap">
          {selectedSuggestions.map((selectedSuggestion) => (
            <Badge key={selectedSuggestion} variant="outline">
              {selectedSuggestion}{" "}
              <Icon
                type={IconType.X}
                size={14}
                className="ml-1 cursor-pointer"
                onClick={() =>
                  onSelectedSuggestionsChange?.(
                    selectedSuggestions.filter((s) => s !== selectedSuggestion)
                  )
                }
              />
            </Badge>
          ))}
        </div>
      </div>
    );
  }
);

export default SearchAndSelect;
