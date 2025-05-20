"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidation = void 0;
const zod_1 = require("zod");
class RequestValidation {
}
exports.RequestValidation = RequestValidation;
RequestValidation.CREATE = zod_1.z.object({
    itinerary_id: zod_1.z.number().positive(),
    request: zod_1.z.string().min(1),
});
