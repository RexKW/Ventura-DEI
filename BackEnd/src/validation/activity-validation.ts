import { z, ZodType } from "zod";

export class ActivityValidation{
    static readonly CREATE: ZodType = z.object({
        name: z.string().min(1).max(100),
        description:z.string(),
        type:z.string().min(1).max(20),
        start_time: z.date(),
        end_time: z.date(),
        cost: z.number().nonnegative(),
        location_name: z.string(),
        location_address: z.string(),
        location_link: z.string(),
        location_name2:    z.string().nullable().optional(),
        location_address2: z.string().nullable().optional(),
        location_link2:    z.string().nullable().optional(),
        method:            z.string().nullable().optional(),
    })

    static readonly CREATEMANY: ZodType = z.object({
        day_id: z.number().nonnegative(),
        name: z.string().min(1).max(100),
        description:z.string(),
        type:z.string().min(1).max(20),
        start_time: z.string(),
        end_time: z.string(),
        cost: z.number().nonnegative(),
        location_name: z.string(),
        location_address: z.string(),
        location_link: z.string(),
        location_name2:    z.string().nullable().optional(),
        location_address2: z.string().nullable().optional(),
        location_link2:    z.string().nullable().optional(),
        method:            z.string().nullable().optional(),
    })

    static readonly UPDATE: ZodType = z.object({
        name: z.string().min(1).max(100),
        day_id: z.number().positive(),
        description:z.string(),
        type:z.string().min(1).max(20),
        start_time: z.date(),
        end_time: z.date(),
        cost: z.number().nonnegative(),
        location_name: z.string(),
        location_address: z.string(),
        location_link: z.string()
    })
}