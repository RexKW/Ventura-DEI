// import { Itinerary_Destinations } from "@prisma/client";

// export interface AddItineraryDestinationRequest {
//   itinerary_id: number;
//   destination_id: number;
//   start_date: Date;
//   end_date: Date;
// }

// export interface UpdateItineraryDestinationRequest {
//   id: number;
//   destination_id: number;
//   start_date: Date;
//   end_date: Date;
// }

// export interface ItineraryDestinationResponse {
//   id: number;
//   destination_id: number;
//   accomodation_id?: number | null;
//   start_date: Date;
//   end_date: Date;
// }

// export interface ItineraryDestinationUpdateRequest {
//   id: number;
//   destination_id: number;
//   accomodation_id?: number | null;
//   start_date: Date;
//   end_date: Date;
// }



// export function toItineraryDestinationResponse(
//   itineraryDestination: Itinerary_Destinations
// ): ItineraryDestinationResponse {
//   return {
//     id: itineraryDestination.id,
//     destination_id: itineraryDestination.destination_id,
//     accomodation_id: itineraryDestination.accomodation_id,
//     start_date: itineraryDestination.start_date,
//     end_date: itineraryDestination.end_date,
//   };
// }

// export function toItineraryDestinationResponseList(prismaTodo: Itinerary_Destinations[]): ItineraryDestinationResponse[] {
//   const result = prismaTodo.map((itineraryDestination) => {
//       return {
//         id: itineraryDestination.id,
//         destination_id: itineraryDestination.destination_id,
//         accomodation_id: itineraryDestination.accomodation_id,
//         start_date: itineraryDestination.start_date,
//         end_date: itineraryDestination.end_date,
//       }
//   })

//   return result
// }
