// import { Destination } from "@prisma/client";

// export interface CreateDestinationRequest {
//   name: string;
//   province: string;
//   destination_api_id: number;
// }

// export interface DestinationResponse {
//   id: number;
//   name: string;
//   province: string;
//   destination_api_id: number;
// }

// export function toDestinationResponse(destination: Destination): DestinationResponse {
//   return {
//     id: destination.id,
//     name: destination.name,
//     province: destination.province,
//     destination_api_id: destination.destination_api_id
//   };
// }

// export function toDestinationResponseList(prismaTodo: Destination[]): DestinationResponse[] {
//   const result = prismaTodo.map((destination) => {
//     return {
//       id: destination.id,
//       name: destination.name,
//       province: destination.province,
//       destination_api_id: destination.destination_api_id
//     };
//   })

//   return result
// }
