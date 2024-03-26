import { AppointmentSettingsFormSchema } from "@/validation/settingsValidations/appointment.validation";
import { UseControllerProps } from "react-hook-form";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TimeGapFormField(
  props: UseControllerProps<AppointmentSettingsFormSchema, "timeGap">
) {
  return (
    <FormField
      {...props}
      render={({ field: { value, onChange } }) => {
        return (
          <FormItem>
            <Select
              onValueChange={(val) =>
                onChange({ ...value, gap: val ? Number(val) : undefined })
              }
              value={value.gap ? String(value.gap) : ""}
              disabled={!value.active}
            >
              <FormControl>
                <SelectTrigger className="max-w-md">
                  <SelectValue placeholder="Select a time gap" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="15">15 min</SelectItem>
                <SelectItem value="30">30 min</SelectItem>
                <SelectItem value="45">45 min</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        );
      }}
    />
  );
}
