"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toScheduleResponse = toScheduleResponse;
exports.toScheduleResponseList = toScheduleResponseList;
function toScheduleResponse(schedule) {
    return {
        id: schedule.id,
        itinerary_id: schedule.itinerary_id,
        date: schedule.date,
    };
}
function toScheduleResponseList(prismaTodo) {
    const result = prismaTodo.map((schedule) => {
        return {
            id: schedule.id,
            itinerary_id: schedule.itinerary_id,
            date: schedule.date,
        };
    });
    return result;
}
