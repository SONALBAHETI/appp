import { FormField } from "@/components/ui/form";
import { AppointmentSettingsFormSchema } from "@/validation/settingsValidations/appointment.validation";
import { UseControllerProps } from "react-hook-form";
import TimeGapCheckboxFormField from "./TimeGapCheckboxFormField";
import { TimeGapFormField } from ".";

export default function TimeGap(
  props: UseControllerProps<AppointmentSettingsFormSchema, "timeGap">
) {
  return (
    <FormField
      {...props}
      render={() => {
        return (
          <div className="flex flex-col gap-3">
            <TimeGapCheckboxFormField
              control={props.control}
              name="timeGap"
            />
            <TimeGapFormField control={props.control} name="timeGap" />
          </div>
        );
      }}
    />
  );
}
