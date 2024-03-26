import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AppointmentSettingsFormSchema,
  SlotSchema,
} from "@/validation/settingsValidations/appointment.validation";
import { UseControllerProps, useWatch } from "react-hook-form";
import { WeeklyTimeSlotDays } from "./WeeklyTimeSlots";
import Icon, { IconType } from "@/components/ui/Icon";

export const SelectTimeSlot = (props: {
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
}) => {
  return (
    <FormItem>
      <Select
        disabled={props.disabled}
        onValueChange={props.onValueChange}
        value={props.value}
      >
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select time" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {Array.from({ length: 24 * 4 }).map((_, index) => {
            let hour = Math.floor(index / 4);
            const minutes = (index % 4) * 15;
            const ampm = hour >= 12 ? "PM" : "AM";
            hour %= 12;
            hour = hour || 12; // change 0 hour to 12
            const time = `${hour.toString().padStart(2, "0")}:${minutes
              .toString()
              .padStart(2, "0")} ${ampm}`;
            return (
              <SelectItem key={time} value={time}>
                <div className="flex items-center justify-between min-w-[70px]">
                  <span>{time.split(" ")[0]}</span>
                  <span className="text-muted-foreground">
                    {time.split(" ")[1]}
                  </span>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </FormItem>
  );
};

interface ITimeSlotFormFieldProps
  extends UseControllerProps<
    AppointmentSettingsFormSchema,
    WeeklyTimeSlotDays
  > {
  onCopySlots?: (enabled: boolean, slots: SlotSchema[]) => void;
}

export default function TimeSlotFormField({
  onCopySlots,
  ...props
}: ITimeSlotFormFieldProps) {
  const watchedValue = useWatch({ name: props.name, control: props.control });
  return (
    <FormField
      {...props}
      render={({ field: { onChange } }) => {
        const handleToTimeChange = (time: string, index: number) => {
          watchedValue.slots[index] = {
            ...watchedValue.slots[index],
            to: time,
          };
          onChange(watchedValue);
        };
        const handleFromTimeChange = (time: string, index: number) => {
          watchedValue.slots[index] = {
            ...watchedValue.slots[index],
            from: time,
          };
          onChange(watchedValue);
        };
        const handleRemoveSlot = (index: number) => {
          watchedValue.slots.splice(index, 1);
          onChange(watchedValue);
        };
        const handleAddSlot = () => {
          watchedValue.slots.push({ from: "09:00 AM", to: "05:00 PM" });
          onChange(watchedValue);
        };
        const handleCopySlots = () => {
          onCopySlots?.(watchedValue.enabled, watchedValue.slots);
        };
        return (
          <FormItem className="flex flex-col">
            {watchedValue?.slots.map((slot, index) => (
              <div className="flex flex-wrap gap-3 items-center" key={index}>
                <SelectTimeSlot
                  disabled={!watchedValue.enabled}
                  value={slot.from}
                  onValueChange={(time) => handleFromTimeChange(time, index)}
                />
                <span className="text-muted-foreground">-</span>
                <SelectTimeSlot
                  disabled={!watchedValue.enabled}
                  value={slot.to}
                  onValueChange={(time) => handleToTimeChange(time, index)}
                />
                <Icon
                  type={IconType.TRASH}
                  size={18}
                  className={`${
                    watchedValue.enabled && watchedValue.slots.length > 1
                      ? "cursor-pointer"
                      : "text-muted-foreground"
                  }`}
                  onClick={() =>
                    watchedValue.enabled &&
                    watchedValue.slots.length > 1 &&
                    handleRemoveSlot(index)
                  }
                />
                {index === 0 && (
                  <>
                    <Icon
                      type={IconType.PLUS}
                      size={18}
                      className={`${
                        watchedValue.enabled
                          ? "cursor-pointer"
                          : "text-muted-foreground"
                      }`}
                      onClick={() => watchedValue.enabled && handleAddSlot()}
                    />
                    {onCopySlots && (
                      <Icon
                        type={IconType.COPY}
                        size={18}
                        className={`${
                          watchedValue.enabled
                            ? "cursor-pointer"
                            : "text-muted-foreground"
                        }`}
                        onClick={() =>
                          watchedValue.enabled && handleCopySlots()
                        }
                      />
                    )}
                  </>
                )}
              </div>
            ))}
            <FormMessage errorPath={["slots"]} />
          </FormItem>
        );
      }}
    />
  );
}
