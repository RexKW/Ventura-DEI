import { Schedule_Per_Day } from "@prisma/client";

export interface CreateScheduleRequest {
  itinerary_destination_id: number;
  date: Date;
}

export interface ScheduleResponse {
  id: number;
  itinerary_id: number;
  date: Date;
}

export function toScheduleResponse(schedule: Schedule_Per_Day): ScheduleResponse {
  return {
    id: schedule.id,
    itinerary_id: schedule.itinerary_id,
    date: schedule.date,
  };
}

export function toScheduleResponseList(prismaTodo: Schedule_Per_Day[]): ScheduleResponse[] {
  const result = prismaTodo.map((schedule) => {
    return {
      id: schedule.id,
      itinerary_id: schedule.itinerary_id,
      date: schedule.date,
    };
  })

  return result
}
