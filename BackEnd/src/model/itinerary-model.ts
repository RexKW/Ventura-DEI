import { Itinerary, Prisma, PrismaClient } from "@prisma/client";
import { number } from "zod";
import { prismaClient } from "../application/database";
import { Decimal } from "@prisma/client/runtime/library";

export interface CreateItineraryRequest {
  name: string;
  created_date: Date;
  updated_date: Date;
  start_date: string;
  end_date: string;
  request: string;
  accomodation_budget: Decimal,
  transporation_budget: Decimal,
  entertainment_budget: Decimal,
  culinary_budget: Decimal,
  misc_budget: Decimal
}

export interface ItineraryModel {
  id: number
  name: string;
  created_date: Date;
  updated_date: Date;
  start_date: Date;
  end_date: Date;
}

export interface GetItineraryRequest{
  id: number;
  user_id: number;
}

export interface ItineraryResponse {
  id: number;
  name: string;
  travellers : number;
  start_date: Date;
  end_date: Date;
  finished: Boolean;
}

export interface ItineraryExploreResponse{
  id: number;
  name: string;
  destinations: number;
}

export interface ItineraryUpdateRequest {
  id: number
  name: string;
  start_date: Date;
  end_date: Date;
}

export function toItineraryResponse(itinerary: Itinerary, travellerNumber: number): ItineraryResponse {
  return {
    id: itinerary.id,
    name: itinerary.name,
    travellers : travellerNumber,
    start_date: itinerary.start_date,
    end_date: itinerary.end_date,
    finished: itinerary.finished
  };
}

// export async function toItineraryExploreResponseList(prismaItinerary: ItineraryModel[]): Promise<ItineraryExploreResponse[]> {
//   const result: ItineraryExploreResponse[] = []

//   for (const itinerary of prismaItinerary){
//     const destinations = await prismaClient.itinerary_Destinations.count({
//       where:{
//           itinerary_id: itinerary.id
//       }
//     })

//     result.push({
//       id: itinerary.id,
//       name: itinerary.name,
//       destinations: destinations
//     })
//   }

//   return result
// }

export async function toItineraryResponseList(prismaItinerary: ItineraryResponse[]): Promise<ItineraryResponse[]> {
  

  // Map each itinerary to a promise that resolves to an ItineraryResponse
  const promises = prismaItinerary.map(async (itinerary) => {
    const travellerNumber = await prismaClient.itinerary_Users.count({
      where: { itinerary_id: itinerary.id },
    });
    return {
      id: itinerary.id,
      name: itinerary.name,
      travellers: travellerNumber,
      start_date: itinerary.start_date,
      end_date: itinerary.end_date,
      finished: itinerary.finished
    } as ItineraryResponse;
  });

  // Await all promises to get an array of ItineraryResponse
  const result = await Promise.all(promises);
  return result;

  // for (const itinerary of prismaitinerary) {
    // const travellerNumber = await prismaClient.itinerary_Users.count({
    //   where: {
    //     itinerary_id: itinerary.id,
    //   },
    // });

  //   const dateRange = await prismaClient.itinerary_Destinations.aggregate({
  //     where: {
  //         itinerary_id: itinerary.id,
  //     },
  //     _min: {
  //         start_date: true,
  //     },
  //     _max: {
  //         end_date: true,
  //     },
  // });

  // const start_date = dateRange._min.start_date?? new Date(0)
  // const end_date = dateRange._max.end_date?? new Date(0)

  //   result.push({
  //     id: itinerary.id,
  //     name: itinerary.name,
  //     travellers: travellerNumber,
  //     start_date: start_date,
  //     end_date: end_date
  //   });
  // }

  // return result;
}