"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toAccomodationResponse = toAccomodationResponse;
// Convert Prisma Accomodation object to AccomodationResponse
function toAccomodationResponse(accomodation) {
    return {
        id: accomodation.id,
        name: accomodation.name,
        address: accomodation.address,
        location_link: accomodation.location_link,
        cost: accomodation.cost,
        people: accomodation.people,
    };
}
