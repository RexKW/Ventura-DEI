"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toItineraryUserResponse = toItineraryUserResponse;
exports.toItineraryUserResponseList = toItineraryUserResponseList;
function toItineraryUserResponse(user) {
    return {
        id: user.id,
        user_id: user.user_id,
        itinerary_id: user.itinerary_id,
        role: user.role,
    };
}
function toItineraryUserResponseList(prismaTodo) {
    const result = prismaTodo.map((itinerary) => {
        return {
            id: itinerary.id,
            user_id: itinerary.user_id,
            itinerary_id: itinerary.itinerary_id,
            role: itinerary.role
        };
    });
    return result;
}
