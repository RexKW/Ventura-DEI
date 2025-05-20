import { Accomodation } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export interface CreateAcomodationRequest {
  name: string;
  address: string;
  location_link: string;
  cost: Decimal;
  people: number;
  itinerary_id: number;
}

// Response interface for returning an accommodation
export interface AccomodationResponse {
  id: number;
  name: string;
  address: string;
  location_link: string;
  cost: Decimal;
  people: number;
}

// Convert Prisma Accomodation object to AccomodationResponse
export function toAccomodationResponse(accomodation: Accomodation): AccomodationResponse {
  return {
    id: accomodation.id,
    name: accomodation.name,
    address: accomodation.address,
    location_link: accomodation.location_link,
    cost: accomodation.cost,
    people: accomodation.people,
  };
}
  