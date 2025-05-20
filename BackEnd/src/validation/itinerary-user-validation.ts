import { z, ZodType } from "zod";

export class ItineraryUserValidation{
    static readonly CREATE: ZodType = z.object({
        itinerary_id: z.number().positive(),
        user_id: z.number().positive()
    })

    static readonly UPDATE: ZodType = z.object({
        id: z.number().positive(),
        itinerary_id: z.number().positive(),
        user_id: z.number().positive()
    })
}