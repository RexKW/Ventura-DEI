import { z, ZodType } from "zod";

export class ItineraryDestinationValidation{
    static readonly CREATE: ZodType = z.object({
        itinerary_id: z.number().positive(),
        destination_id: z.number().positive(),
        start_date: z.date(),
        end_date: z.date()
    })

    static readonly UPDATE: ZodType = z.object({
        id: z.number().positive(),
        destination_id: z.number().positive(),
        start_date: z.date(),
        end_date: z.date()
    })
}