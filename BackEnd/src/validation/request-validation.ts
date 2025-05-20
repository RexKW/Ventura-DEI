import { z, ZodType } from "zod";

export class RequestValidation{
    static readonly CREATE: ZodType = z.object({
        itinerary_id: z.number().positive(),
        request: z.string().min(1),
    })


}