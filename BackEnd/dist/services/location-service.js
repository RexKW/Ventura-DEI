"use strict";
// import { prismaClient } from "../application/database";
// import { Location } from "@prisma/client";
// import { ResponseError } from "../error/response-error";
// export class LocationService {
//   /**
//    * Get or create a location in the database
//    * @param locationRequest - Location data to check or create
//    */
//   static async getOrCreateLocation(locationRequest: {
//     place_id: string;
//     place_api: string; // Include place_api here
//     name: string;
//     address: string;
//     categories: string[];
//     opening_hours?: string | null;
//     website?: string | null;
//     phone?: string | null;
//     location_image?: string;
//     description?: string;
//   }) {
//     // Check if a location with the same place_id exists
//     let location = await prismaClient.location.findUnique({
//       where: {
//         place_id: locationRequest.place_id,
//       },
//     });
//     if (!location) {
//       // If not found, create a new location
//       location = await prismaClient.location.create({
//         data: {
//           place_id: locationRequest.place_id,
//           place_api: locationRequest.place_api, // Add the place_api field here
//           name: locationRequest.name,
//           address: locationRequest.address,
//           categories: locationRequest.categories,
//           opening_hours: locationRequest.opening_hours || null,
//           website: locationRequest.website || null,
//           phone: locationRequest.phone || null,
//           location_image: locationRequest.location_image || "default_image_url",
//           description: locationRequest.description || "Default description",
//         },
//       });
//     }
//     return location;
//   }
// /**
//  * Fetch location details from an external API
//  * @param place_id - The unique identifier for the location
//  * @param categories - The categories to filter the location (e.g., "entertainment,commercial")
//  */
// static async fetchLocationFromExternalAPI(place_id: string, categories: string): Promise<any> {
//     const axios = require("axios");
//     const apiKey = "c9b67c73febc4f71baad197651185143"; // Replace with your actual API key
//     const url = `https://api.geoapify.com/v2/places?categories=${categories}&filter=place:${place_id}&limit=30&apiKey=${apiKey}`;
//     try {
//       console.log(`Calling external API with URL: ${url}`); // Log the URL
//       const response = await axios.get(url);
//       return response.data;
//     } catch (error) {
//       // Simplified error handling with a fixed HTTP status
//       console.error(`Error fetching location details for place_id ${place_id}:`, error);
//       throw new ResponseError(
//         400,
//         `Failed to fetch location details for place_id ${place_id}.`
//       );
//     }
//   }
//   /**
//    * Get all days for an itinerary destination
//    * @param itinerary_destination_id - The ID of the itinerary destination
//    */
//   static async getAllDays(itinerary_destination_id: number): Promise<any[]> {
//     const allDays = await prismaClient.schedule_Per_Day.findMany({
//       where: {
//         itinerary_destination_id: itinerary_destination_id,
//       },
//     });
//     return allDays;
//   }
//     /**
//    * Get all locations from the database
//    * @returns A list of all locations
//    */
//     static async getAllLocations(): Promise<Location[]> {
//         try {
//           const locations = await prismaClient.location.findMany();
//           return locations;
//         } catch (error) {
//           console.error("Error fetching all locations:", error);
//           throw new ResponseError(500, "Failed to fetch all locations.");
//         }
//       }
// }
