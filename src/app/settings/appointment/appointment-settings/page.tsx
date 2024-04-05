"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { AppointmentSettingsFormSchema } from "@/validation/settingsValidations/appointment.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { HourlyRateFormField } from "@/components/settings/appointment";
import WeeklyTimeSlots, {
  Weekdays,
} from "@/components/settings/appointment/WeeklyTimeSlots";
import { useEffect } from "react";
import TimeGap from "@/components/settings/appointment/TimeGap";
import {
  useAppointmentSettingsMutation,
  useAppointmentSettingsQuery,
} from "@/api/appointmentSettings";
import { toast } from "react-toastify";
import Loader from "@/components/ui/Loader";

export default function AppointmentSettingsPage() {
  const appointmentSettingsQuery = useAppointmentSettingsQuery();
  const appointmentSettingsMutation = useAppointmentSettingsMutation();

  const form = useForm<AppointmentSettingsFormSchema>({
    resolver: zodResolver(AppointmentSettingsFormSchema),
  });

  const onSubmit = async (data: AppointmentSettingsFormSchema) => {
    try {
      await appointmentSettingsMutation.mutateAsync(data);
      toast.success("Settings saved successfully.");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    if (!appointmentSettingsQuery.data) return;
    const { availability } = appointmentSettingsQuery.data;
    // this is a heavy task, so we should not block the UI rendering
    // timeout is added to ensure that the form is rendered after other renders
    // todo: optimize this heavy task
    setTimeout(() => {
      if (availability.hourlyRate) {
        form.setValue("hourlyRate", availability.hourlyRate);
      }
      if (availability.timegap) {
        form.setValue("timeGap", {
          active: true,
          gap: availability.timegap,
        });
      }
      if (availability.weeklySchedule) {
        form.setValue("weeklyTimeSlots", availability.weeklySchedule);
      } else {
        Weekdays.forEach((day) => {
          form.setValue(`weeklyTimeSlots.${day}`, {
            enabled: false,
            slots: [{ from: "09:00 AM", to: "05:00 PM" }],
          });
        });
      }
    });
  }, [appointmentSettingsQuery.data]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-10">
          {/* Header */}
          <div className="flex flex-col items-stretch md:flex-row md:items-center justify-between gap-3">
            <div>
              <h4>Appointment settings</h4>
              <p className="text-faded">
                Set times when mentees can schedule meetings with you.
              </p>
            </div>
            <div className="flex items-center gap-4">
              {appointmentSettingsQuery.isFetching && (
                <Loader className="mr-2" />
              )}
              <Button
                disabled={
                  appointmentSettingsMutation.isPending ||
                  appointmentSettingsQuery.isFetching ||
                  appointmentSettingsQuery.isError
                }
                className="px-6"
              >
                {appointmentSettingsMutation.isPending && (
                  <Loader className="mr-2" />
                )}
                Save
              </Button>
            </div>
          </div>

          {appointmentSettingsQuery.isError && (
            <div className="absolute-center bg-secondary py-10 text-faded">
              Something went wrong. Please try again later.
            </div>
          )}

          {appointmentSettingsQuery.isSuccess && (
            <>
              {/* hourly rate */}
              <HourlyRateFormField
                control={form.control}
                name="hourlyRate"
                defaultValue={undefined}
              />

              {/* Weekly availability */}
              <div className="flex flex-col gap-3">
                <h6>Set your weekly hours</h6>
                <WeeklyTimeSlots
                  control={form.control}
                  name="weeklyTimeSlots"
                  defaultValue={{
                    monday: { enabled: false, slots: [] },
                    tuesday: { enabled: false, slots: [] },
                    wednesday: { enabled: false, slots: [] },
                    thursday: { enabled: false, slots: [] },
                    friday: { enabled: false, slots: [] },
                    saturday: { enabled: false, slots: [] },
                    sunday: { enabled: false, slots: [] },
                  }}
                />
              </div>
              <TimeGap
                control={form.control}
                name="timeGap"
                defaultValue={{ active: false, gap: 15 }}
              />
            </>
          )}
        </div>
      </form>
    </Form>
  );
}
