import { AppointmentSettingsFormSchema } from "@/validation/settingsValidations/appointment.validation";
import { UseControllerProps, useWatch } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

export default function TimeGapCheckboxFormField(
  props: UseControllerProps<AppointmentSettingsFormSchema, "timeGap">
) {
  const value = useWatch({ name: props.name, control: props.control });
  return (
    <FormField
      {...props}
      render={({ field: { onChange } }) => (
        <FormItem className="flex items-center gap-2">
          <FormControl>
            <Checkbox
              checked={value?.active as boolean}
              onCheckedChange={(checked) => {
                onChange({ ...value, active: checked });
              }}
            />
          </FormControl>
          <FormLabel className="!m-0">Add time gap before events</FormLabel>
        </FormItem>
      )}
    />
  );
}
