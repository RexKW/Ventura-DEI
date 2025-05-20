"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toItineraryResponse = toItineraryResponse;
exports.toItineraryResponseList = toItineraryResponseList;
const database_1 = require("../application/database");
function toItineraryResponse(itinerary, travellerNumber) {
    return {
        id: itinerary.id,
        name: itinerary.name,
        travellers: travellerNumber,
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
function toItineraryResponseList(prismaItinerary) {
    return __awaiter(this, void 0, void 0, function* () {
        // Map each itinerary to a promise that resolves to an ItineraryResponse
        const promises = prismaItinerary.map((itinerary) => __awaiter(this, void 0, void 0, function* () {
            const travellerNumber = yield database_1.prismaClient.itinerary_Users.count({
                where: { itinerary_id: itinerary.id },
            });
            return {
                id: itinerary.id,
                name: itinerary.name,
                travellers: travellerNumber,
                start_date: itinerary.start_date,
                end_date: itinerary.end_date,
                finished: itinerary.finished
            };
        }));
        // Await all promises to get an array of ItineraryResponse
        const result = yield Promise.all(promises);
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
    });
}
