import { z, ZodType } from "zod";

export class ItineraryValidation{
    static readonly CREATE: ZodType = z.object({
        name: z.string().min(1).max(100),
        start_date: z.string(),
        end_date: z.string(),
        request: z.string().min(1),
        accomodation_budget: z.number().nonnegative(),
        transporation_budget: z.number().nonnegative(),
        entertainment_budget: z.number().nonnegative(),
        culinary_budget: z.number().nonnegative(),
        misc_budget: z.number().nonnegative()
    })

    static readonly UPDATE: ZodType = z.object({
        id: z.number().positive(),
        name: z.string().min(1).max(100),
    })
}