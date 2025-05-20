"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItineraryUserValidation = void 0;
const zod_1 = require("zod");
class ItineraryUserValidation {
}
exports.ItineraryUserValidation = ItineraryUserValidation;
ItineraryUserValidation.CREATE = zod_1.z.object({
    itinerary_id: zod_1.z.number().positive(),
    user_id: zod_1.z.number().positive()
});
ItineraryUserValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.number().positive(),
    itinerary_id: zod_1.z.number().positive(),
    user_id: zod_1.z.number().positive()
});
