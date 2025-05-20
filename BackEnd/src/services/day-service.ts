import { ActivityResponse, CreateActivityRequest, toActivityResponse, toActivityResponseList } from "../model/activity-model";
import { Validation } from "../validation/validation";
import { Activity, Schedule_Per_Day} from "@prisma/client"
import { prismaClient } from "../application/database"
import { ResponseError } from "../error/response-error"
import { ActivityValidation } from "../validation/activity-validation";
import { ScheduleResponse, toScheduleResponse, toScheduleResponseList } from "../model/schedule-per-day-model";

export class DayService{
    static async getAllDays(itinerary_id: number): Promise<ScheduleResponse[]>{
        const allDays = await prismaClient.schedule_Per_Day.findMany({
            where: {
                itinerary_id: itinerary_id
            },
        })

        allDays.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        return toScheduleResponseList(allDays)
    }

    static async getDay(day_id: number): Promise<ScheduleResponse>{
        const day = await prismaClient.schedule_Per_Day.findUnique({
            where:{
                id: day_id
            },
        })

        if (!day) {
            throw new ResponseError(400, "Day not found!")
        }

        return day
    }
}