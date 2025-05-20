// import { NextFunction, Request, Response } from "express";
// import { CreateLocationRequest, LocationResponse } from "../model/location-model";
// import { LocationService } from "../services/location-service";
// import { prismaClient } from "../application/database";

// export class LocationController {
//   /**
//    * Get or create a location
//    * @param req - Express Request object
//    * @param res - Express Response object
//    * @param next - Express NextFunction
//    */

//   static async getOrCreateLocation(req: Request, res: Response, next: NextFunction) {
//     try {
//         // Extract parameters from query
//         const { place_id, categories, name, address, openingHours, website, phone } = req.query;

//         if (!place_id || !categories) {
//             throw new Error("Missing required query parameters: place_id or categories.");
//         }

//         // Normalize categories to a string array
//         const normalizedCategories = Array.isArray(categories)
//             ? categories.map((category) => String(category))
//             : [String(categories)];

//         // Pass parameters to LocationService
//         const location = await LocationService.getOrCreateLocation({
//             place_id: place_id as string,
//             place_api: "geoapify", // Example source, adjust as needed
//             name: name as string,
//             address: address as string,
//             categories: normalizedCategories,
//             opening_hours: openingHours ? String(openingHours) : null,
//             website: website ? String(website) : null,
//             phone: phone ? String(phone) : null,
//             location_image: "default_image_url", // Example, replace as needed
//             description: "Default description", // Example, replace as needed
//         });

//         // Respond with the location data
//         res.status(200).json({ data: location });
//     } catch (error) {
//         next(error);
//     }
// }
//   /**
//    * Get all locations
//    * @param req - Express Request object
//    * @param res - Express Response object
//    * @param next - Express NextFunction
//    */
//   static async getAllLocations(req: Request, res: Response, next: NextFunction) {
//     try {
//       const locations = await LocationService.getAllLocations();
//       res.status(200).json({
//         data: locations,
//       });
//     } catch (error) {
//       next(error);
//     }
//   }
  
//   static async getLocationById(req: any, res: any, next: any) {
//     try {
//         console.log("Request received to get location by ID:", req.params.locationId);

//         const locationId = parseInt(req.params.locationId);

//         if (isNaN(locationId)) {
//             console.error("Invalid location ID");
//             return res.status(400).json({ error: "Invalid location ID" });
//         }

//         const location = await prismaClient.location.findUnique({
//             where: { id: locationId },
//         });

//         if (!location) {
//             console.warn("Location not found for ID:", locationId);
//             return res.status(404).json({ error: "Location not found" });
//         }

//         console.log("Location found:", location);
//         res.status(200).json({ data: location });
//     } catch (error) {
//         console.error("Error in getLocationById:", error);
//         next(error);
//     }
// }

// //   static async getLocationById(req: Request, res: Response, next: NextFunction) {
// //     try {
// //         const locationId = parseInt(req.params.locationId);

// //         if (isNaN(locationId)) {
// //             return res.status(400).json({ error: "Invalid location ID" });
// //         }

// //         const location = await prismaClient.location.findUnique({
// //             where: { id: locationId },
// //         });

// //         if (!location) {
// //             return res.status(404).json({ error: "Location not found" });
// //         }

// //         res.status(200).json({ data: location });
// //     } catch (error) {
// //         next(error);
// //     }
// // }
  
// }
