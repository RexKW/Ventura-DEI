import { NextFunction, Request, Response } from "express";
import { LoginUserRequest, RegisterUserRequest, UserResponse } from "../model/user-model";
import { UserService } from "../services/auth-service";
import { AccomodationService } from "../services/accomodation-service";
import { CreateAcomodationRequest } from "../model/accomodation-model";
import { Decimal } from "@prisma/client/runtime/library";

export class AccomodationController {
    static async createAccomodation(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                itinerary_id,
                name,
                address,
                location_link,
                cost,
                people,
            } = req.query as Record<string, string>;

            // Validate required fields
            if (!itinerary_id || !name || !address || !location_link  || cost === undefined) {
                throw new Error(
                    "Missing required fields: place_id, name, address, place_api, categories, cost, or people."
                );
            }

            // Normalize categories

            // Pass the data to AccomodationService
            const accomodation = await AccomodationService.createAccomodation(
                {
                itinerary_id: Number(itinerary_id),
                name,
                address,
                location_link: location_link, // Default image
                cost: new Decimal(cost),                  // Convert to number
                people: parseInt(people),                 // Convert to number
            }
        );

            // Respond with the accommodation data
            res.status(200).json({ data: accomodation });
        } catch (error) {
            next(error);
        }
    }

    static async getSavedAccomodations(req: Request, res: Response, next: NextFunction){
        try{
            const savedAccommodation = await AccomodationService
            res.status(200).json({ data: savedAccommodation });
        }catch(error){
            next(error)
        }
    }

    

    // static async getOrCreateAccomodation(req: Request, res: Response, next: NextFunction) {
    //   try {
    //     const {
    //       place_id,
    //       name,
    //       address,
    //       location_image,
    //       place_api,
    //       categories,
    //       opening_hours,
    //       website,
    //       phone,
    //       cost,
    //       people
    //     } = req.body as CreateAcomodationRequest;
  
    //     // Validate required fields
    //     if (!place_id || !name || !address || !place_api || !categories || cost === undefined || people === undefined) {
    //       throw new Error(
    //         "Missing required fields: place_id, name, address, place_api, categories, cost, or people."
    //       );
    //     }
  
    //     // Normalize categories
    //     const normalizedCategories = Array.isArray(categories)
    //       ? categories.map((category) => String(category))
    //       : [String(categories)];
  
    //     // Pass the data to AccomodationService
    //     const accomodation = await AccomodationService.getOrCreateAccomodation({
    //       place_id,
    //       name,
    //       address,
    //       location_image: location_image || "default_image_url", // Default image
    //       place_api,
    //       categories: normalizedCategories,
    //       opening_hours: opening_hours || undefined, // Replace null with undefined
    //       website: website || undefined,            // Replace null with undefined
    //       phone: phone || undefined,                // Replace null with undefined
    //       cost,
    //       people,
    //     });
  
    //     // Respond with the accommodation data
    //     res.status(200).json({ data: accomodation });
    //   } catch (error) {
    //     next(error);
    //   }
    // }
  }