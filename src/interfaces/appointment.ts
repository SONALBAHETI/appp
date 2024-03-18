export type AppointmentUserReference = { id: string, name: string };

export type AppointmentStatus =
  | "pending"
  | "scheduled"
  | "reschedule requested"
  | "completed"
  | "cancelled";

export interface IAppointment {
  scheduledBy: string | AppointmentUserReference;
  scheduledWith: string | AppointmentUserReference;
  status: AppointmentStatus;
  cancelledBy?: string | AppointmentUserReference;
  cancelReason?: string;
  rescheduleRequests?: IRescheduleRequest[];
  scheduledDate: string; // timestamp string
  userGoals: string;
  timeDuration: number;
  meetingRoomId: string;
}

export interface IRescheduleRequest {
  requestedBy: string | AppointmentUserReference;
  rescheduleDate: string; // timestamp string
  rescheduleReason: string;
}

export interface IGetAppointmentResponse {
  appointment: IAppointment;
}
