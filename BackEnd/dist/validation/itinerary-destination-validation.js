"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItineraryDestinationValidation = void 0;
const zod_1 = require("zod");
class ItineraryDestinationValidation {
}
exports.ItineraryDestinationValidation = ItineraryDestinationValidation;
ItineraryDestinationValidation.CREATE = zod_1.z.object({
    itinerary_id: zod_1.z.number().positive(),
    destination_id: zod_1.z.number().positive(),
    start_date: zod_1.z.date(),
    end_date: zod_1.z.date()
});
ItineraryDestinationValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.number().positive(),
    destination_id: zod_1.z.number().positive(),
    start_date: zod_1.z.date(),
    end_date: zod_1.z.date()
});
