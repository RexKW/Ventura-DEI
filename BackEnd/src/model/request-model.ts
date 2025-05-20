import { Request } from "@prisma/client";

export interface CreateRequest {
    id:  number
    itinerary_id:  number
    request:  string
    finished : Boolean 
}

export interface ScheduleResponse {
    id: number;
    itinerary_id: number;
    request:  string
    finished : Boolean 
}


