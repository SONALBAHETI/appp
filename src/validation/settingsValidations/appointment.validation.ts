import { z } from "zod";

export const SlotTimeSchema = z.string().refine((val) => {
  const [time, amPm] = val.split(" ");
  const [hours, minutes] = time.split(":");
  const hour = Number(hours);
  const minute = Number(minutes);
  if (
    hour < 0 ||
    hour > 23 ||
    minute < 0 ||
    minute > 59 ||
    (amPm !== "AM" && amPm !== "PM")
  ) {
    return false;
  }
  return true;
});

export const SlotSchema = z.object({
  from: SlotTimeSchema,
  to: SlotTimeSchema,
});

export const TimeSlotDaySchema = z
  .object({
    enabled: z.boolean().default(true),
    slots: z.array(SlotSchema).default([]),
  }).refine(
    ({ enabled, slots }) => {
      if (!enabled) return true;
      for (const slot of slots) {
        const fromTimeStr = slot.from;
        const toTimeStr = slot.to;
        if (fromTimeStr && toTimeStr) {
          const [fromTime, fromAmPm] = fromTimeStr.split(" ");
          const [fromHour, fromMinute] = fromTime.split(":");
          const [toTime, toAmPm] = toTimeStr.split(" ");
          const [toHour, toMinute] = toTime.split(":");
          const from = {
            hour: Number(fromHour),
            minute: Number(fromMinute),
            amPm: fromAmPm,
          };
          const to = {
            hour: Number(toHour),
            minute: Number(toMinute),
            amPm: toAmPm,
          };
          if (from.amPm === "PM" && from.hour < 12) {
            from.hour += 12;
          }
          if (to.amPm === "PM" && to.hour < 12) {
            to.hour += 12;
          }
          if (
            from.hour > to.hour ||
            (from.hour === to.hour && from.minute >= to.minute)
          ) {
            return false;
          }
        }
        return true;
      }
    },
    {
      message: "Start time should be before end time", 
      path: ["slots"],
    }
  )
  .default({});

export const WeeklyTimeSlotSchema = z
  .object({
    monday: TimeSlotDaySchema,
    tuesday: TimeSlotDaySchema,
    wednesday: TimeSlotDaySchema,
    thursday: TimeSlotDaySchema,
    friday: TimeSlotDaySchema,
    saturday: TimeSlotDaySchema,
    sunday: TimeSlotDaySchema,
  })
  .refine(
    (val) => {
      const values = Object.values(val);
      const hasTimeSlots = values.some(
        (value) => value.slots.length > 0 && value.enabled
      );
      if (!hasTimeSlots) {
        return false;
      }
      return true;
    },
    {
      message: "Please select at least one time slot",
    }
  )
  .default({});

export const AppointmentSettingsFormSchema = z.object({
  hourlyRate: z
    .number({ required_error: "Please select a valid hourly rate" })
    .min(1, { message: "Please enter a valid hourly rate" }),
  timeGap: z
    .object({
      active: z.boolean().default(true),
      gap: z
        .number()
        .min(15, { message: "Please enter a valid time gap" })
        .default(15),
    })
    .default({}),
  weeklyTimeSlots: WeeklyTimeSlotSchema,
});

export type SlotSchema = z.infer<typeof SlotSchema>;

export type TimeSlotSchema = z.infer<typeof SlotTimeSchema>;

export type TimeSlotDaySchema = z.infer<typeof TimeSlotDaySchema>;

export type WeeklyTimeSlotSchema = z.infer<typeof WeeklyTimeSlotSchema>;

export type AppointmentSettingsFormSchema = z.infer<
  typeof AppointmentSettingsFormSchema
>;
