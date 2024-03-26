import { AppointmentSettingsFormSchema } from "@/validation/settingsValidations/appointment.validation";
import { UseControllerProps, useWatch } from "react-hook-form";
import { WeeklyTimeSlotDays } from "./WeeklyTimeSlots";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

interface IWeeklyTimeSlotCheckboxFormFieldProps
  extends UseControllerProps<
    AppointmentSettingsFormSchema,
    WeeklyTimeSlotDays
  > {
  label: string;
}

export default function WeeklyTimeSlotCheckboxFormField({
  label,
  ...props
}: IWeeklyTimeSlotCheckboxFormFieldProps) {
  const watchedValue = useWatch({ name: props.name, control: props.control });
  return (
    <FormField
      {...props}
      render={({ field: { onChange } }) => {
        return (
          <FormItem className="flex flex-row items-center space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={watchedValue?.enabled}
                onCheckedChange={(checked) => {
                  onChange({ ...watchedValue, enabled: checked });
                }}
              />
            </FormControl>
            <FormLabel className="capitalize">{label}</FormLabel>
          </FormItem>
        );
      }}
    />
  );
}
