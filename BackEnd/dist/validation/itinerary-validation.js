"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItineraryValidation = void 0;
const zod_1 = require("zod");
class ItineraryValidation {
}
exports.ItineraryValidation = ItineraryValidation;
ItineraryValidation.CREATE = zod_1.z.object({
    name: zod_1.z.string().min(1).max(100),
    start_date: zod_1.z.string(),
    end_date: zod_1.z.string(),
    request: zod_1.z.string().min(1),
    accomodation_budget: zod_1.z.number().nonnegative(),
    transporation_budget: zod_1.z.number().nonnegative(),
    entertainment_budget: zod_1.z.number().nonnegative(),
    culinary_budget: zod_1.z.number().nonnegative(),
    misc_budget: zod_1.z.number().nonnegative()
});
ItineraryValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.number().positive(),
    name: zod_1.z.string().min(1).max(100),
});
