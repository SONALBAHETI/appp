export interface ITimeSlots {
  from: string;
  to: string;
}

export interface IDaySchedule {
  enabled: boolean;
  slots: ITimeSlots[];
}

export interface IWeeklySchedule {
  sunday: IDaySchedule;
  monday: IDaySchedule;
  tuesday: IDaySchedule;
  wednesday: IDaySchedule;
  thursday: IDaySchedule;
  friday: IDaySchedule;
  saturday: IDaySchedule;
}

export interface IAvailability {
  online: boolean;
  weeklySchedule?: IWeeklySchedule;
  timegap?: number;
  hourlyRate?: number;
}
