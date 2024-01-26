// Imports the cn utility function from the specified directory
import { cn } from "@/lib/utils";
import { Button } from "./button";

/**
 * Toggles an item in the given options array.
 *
 * @param options - The array of options.
 * @param item - The item to toggle.
 * @return The updated options array.
 */
function toggleItem(options: IToggleOption[], item: IToggleOption) {
  const index = options.indexOf(item);

  if (index > -1) {
    options.splice(index, 1);
  } else {
    options.push(item);
  }

  return options;
}

interface IToggleOptionsProps {
  options: IToggleOption[];
  selectedOptions: IToggleOption[];
  allowMultipleSelection?: Boolean;
  onChange?: (option: IToggleOption[]) => void;
  className?: string;
}

/**
 * Renders toggle options.
 *
 * @param {IToggleOptionsProps} props
 *
 * @return The rendered toggle options component.
 */
export default function ToggleOptions({
  allowMultipleSelection = false,
  ...props
}: IToggleOptionsProps) {
  return (
    // Renders a div with specified class names
    <div className={cn("flex flex-col sm:flex-row gap-4", props.className)}>
      {/* Maps over the options and renders a Button component for each option */}
      {props.options.map((option) => (
        <Button
          key={option.value}
          variant={
            props.selectedOptions.includes(option) ? "accent" : "outline"
          }
          className="flex-1"
          onClick={() => {
            if (props.onChange) {
              if (!allowMultipleSelection) {
                props.onChange([option]);
              } else {
                const selectedOptions = props.selectedOptions.filter(
                  (op) => op.value !== ""
                );
                props.onChange(toggleItem(selectedOptions, option));
              }
            }
          }}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}