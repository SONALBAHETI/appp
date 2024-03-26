import {
  AppointmentSettingsFormSchema,
  WeeklyTimeSlotSchema,
} from "@/validation/settingsValidations/appointment.validation";
import { UseControllerProps } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import TimeSlotFormField from "./TimeSlotFormField";
import WeeklyTimeSlotCheckboxFormField from "./WeeklyTimeSlotCheckboxFormField";

export type WeeklyTimeSlotDays =
  | "weeklyTimeSlots.sunday"
  | "weeklyTimeSlots.monday"
  | "weeklyTimeSlots.tuesday"
  | "weeklyTimeSlots.wednesday"
  | "weeklyTimeSlots.thursday"
  | "weeklyTimeSlots.friday"
  | "weeklyTimeSlots.saturday";

export const Weekdays: (keyof AppointmentSettingsFormSchema["weeklyTimeSlots"])[] =
  [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

export default function WeeklyTimeSlots(
  props: UseControllerProps<AppointmentSettingsFormSchema, "weeklyTimeSlots">
) {
  return (
    <FormField
      {...props}
      render={({ field: { value, onChange } }) => {
        return (
          <FormItem className="flex flex-col gap-4">
            {(Object.keys(value) as (keyof typeof value)[]).map((day) => {
              return (
                <div key={day} className="flex flex-col md:flex-row items-start gap-3">
                  <div className="mt-3 min-w-[140px]">
                    <WeeklyTimeSlotCheckboxFormField
                      control={props.control}
                      name={`weeklyTimeSlots.${day}`}
                      label={day}
                    />
                  </div>
                  <div className="flex-1">
                    <FormControl>
                      <TimeSlotFormField
                        control={props.control}
                        name={`weeklyTimeSlots.${day}`}
                        defaultValue={{ enabled: true, slots: [] }}
                        onCopySlots={(enabled, slots) => {
                          // copy slots of one weekday to all other weekdays
                          const newWeeklyTimeSlots: Partial<WeeklyTimeSlotSchema> =
                            {};
                          (
                            Object.keys(value) as (keyof typeof value)[]
                          ).forEach((day) => {
                            newWeeklyTimeSlots[day] = {
                              enabled,
                              slots,
                            };
                          });
                          onChange(newWeeklyTimeSlots);
                        }}
                      />
                    </FormControl>
                  </div>
                </div>
              );
            })}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
