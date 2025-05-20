import { Itinerary_Users } from "@prisma/client";

export interface AddItineraryUserRequest {
  user_id: number;
  itinerary_id: number;
  role: string;
}

export interface ItineraryUserResponse {
  id: number;
  user_id: number;
  itinerary_id: number;
  role: string;
}




export function toItineraryUserResponse(user: Itinerary_Users): ItineraryUserResponse {
  return {
    id: user.id,
    user_id: user.user_id,
    itinerary_id: user.itinerary_id,
    role: user.role,
  };
}

export function toItineraryUserResponseList(prismaTodo: Itinerary_Users[]): ItineraryUserResponse[] {
  const result = prismaTodo.map((itinerary) => {
      return {
        id: itinerary.id,
        user_id: itinerary.user_id,
        itinerary_id: itinerary.itinerary_id,
        role: itinerary.role
      }
  })

  return result
}