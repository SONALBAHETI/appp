import { UseControllerProps, useWatch } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AppointmentSettingsFormSchema } from "@/validation/settingsValidations/appointment.validation";

export default function HourlyRateFormField(
  props: UseControllerProps<AppointmentSettingsFormSchema>
) {
  const value = useWatch({ name: props.name, control: props.control });
  return (
    <FormField
      {...props}
      render={({ field: { onChange } }) => (
        <FormItem>
          <FormLabel>Hourly rate</FormLabel>
          <Select
            onValueChange={(value) =>
              onChange(value ? Number(value) : undefined)
            }
            value={value ? String(value) : ""}
          >
            <FormControl>
              <SelectTrigger className="max-w-md">
                <SelectValue placeholder="Select your hourly rate" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {/* TODO: Fetch this from server */}
              <SelectItem value="30">$30/hour</SelectItem>
              <SelectItem disabled value="40">
                $40/hour
              </SelectItem>
              <SelectItem disabled value="50">
                $50/hour
              </SelectItem>
            </SelectContent>
          </Select>
          <FormDescription>
            {/* TODO: Add levels link */}
            You can unlock the pricing based on levels.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
