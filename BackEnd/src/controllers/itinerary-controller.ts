import { NextFunction, Request, Response } from "express";
import { CreateItineraryRequest, ItineraryResponse, GetItineraryRequest, ItineraryUpdateRequest } from "../model/itinerary-model";
// import { AddItineraryDestinationRequest, UpdateItineraryDestinationRequest } from "../model/itinerary-destinations-model";
import { ItineraryService } from "../services/itinerary-service";
import { UserRequest } from "../types/user-request";
// import { ItineraryDestinationService } from "../services/itinerary-destinations-service";
import { AddItineraryUserRequest } from "../model/itinerary-users-model";
import { ItineraryUserService } from "../services/itinerary-users-service";
import moment from 'moment';

export class ItineraryController{
    static async getItinerary(req: UserRequest, res: Response, next: NextFunction){
        try {
			const response = await ItineraryService.getItinerary(
				Number(req.params.itineraryId)
			)

			res.status(200).json({
				data: response,
			})
		} catch (error) {
			next(error)
		}
    }

	// static async exploreItinerary(req: Request, res: Response, next: NextFunction){
	// 	try{
	// 		const response = await ItineraryService.explore()

	// 		res.status(200).json({
	// 			data: response
	// 		})

	// 	}catch(error){
	// 		next(error)
	// 	}
	// }



    static async getAllItinerary(req: UserRequest, res: Response, next: NextFunction){
        try {
			const response = await ItineraryService.getAllItinerary(
				req.user!
			)

			res.status(200).json({
				data: response,
			})
		} catch (error) {
			next(error)
		}
    }

	static async getAllInvitedItinerary(req: UserRequest, res: Response, next: NextFunction){
        try {
			const response = await ItineraryService.getAllInvitedItinerary(
				req.user!
			)

			res.status(200).json({
				data: response,
			})
		} catch (error) {
			next(error)
		}
    }


    static async createNewItinerary(req: UserRequest, res: Response, next: NextFunction) {
        try {
			const request = req.body as CreateItineraryRequest
			const response = await ItineraryService.createItinerary(request, req.user! )

			res.status(200).json({
				data: response,
			})
		} catch (error) {
			next(error)
		}
	}
	
    

    static async deleteItinerary(req: UserRequest, res: Response, next: NextFunction) {
        try {
			const response = await ItineraryService.deleteItinerary(
				Number(req.params.itineraryId)
			)

			res.status(200).json({
				data: response,
			})
		} catch (error) {
			next(error)
		}
    }

    static async updateItinerary(req: Request, res: Response, next: NextFunction) {
        try {
			const request = req.body as ItineraryUpdateRequest
			request.id = Number(req.params.itineraryId)
			const response = await ItineraryService.updateItinerary(request)

			res.status(200).json({
				data: response,
			})
		} catch (error) {
			next(error)
		}
    }

	static async cloneItinerary(req: UserRequest, res: Response, next: NextFunction){
		try{
			const id = Number(req.params.itineraryId)
			const response = await ItineraryService.cloneItinerary(id, req.user!)
			res.status(200).json({
				data: response,
			})

		}catch(error){

		}
	}


	//Destinations 

	// static async selectDestination(req: UserRequest, res: Response, next: NextFunction){
	// 	try{
	// 		const request = req.body as AddItineraryDestinationRequest
	// 		request.destination_id = Number(req.params.destinationId)
			
	// 		const dateRequest = {
	// 			...request,
	// 			start_date: new Date(request.start_date),
	// 			end_date: new Date(request.end_date)
	// 		}
	// 		const response = await ItineraryDestinationService.createItineraryDestination(dateRequest, req.user!)
	// 		res.status(200).json({
	// 			data: response,
	// 		})
	// 	}catch (error){
	// 		next(error)
	// 	}
	// }

	// static async allJourney(req: Request, res: Response, next: NextFunction){
	// 	try{
	// 		const itinerary_id = parseInt(req.params.itineraryId, 10)
	// 		const response = await ItineraryDestinationService.getAllItinenaryDestination(itinerary_id)
	// 		res.status(200).json({
	// 			data:response
	// 		})
	// 	}catch(error){
	// 		next(error)
	// 	}
	// }

	// static async getJourney(req: Request, res: Response, next: NextFunction){
	// 	try{
	// 		const itinerary_destination_id = Number(req.params.itineraryDestinationId)
	// 		const response = await ItineraryDestinationService.getItineraryDestination(itinerary_destination_id)

	// 		res.status(200).json({
	// 			data: response
	// 		})
	// 	}catch(error){
	// 		next(error)
	// 	}
	// }


	// static async updateJourney(req: UserRequest, res: Response, next: NextFunction) {
    //     try{
	// 		const request = req.body as UpdateItineraryDestinationRequest
	// 		request.id = Number(req.params.itineraryDestinationId)
			
	// 		const dateRequest = {
	// 			...request,
	// 			start_date: new Date(request.start_date),
	// 			end_date: new Date(request.end_date)
	// 		}
	// 		const response = await ItineraryDestinationService.updateItineraryDestination(dateRequest)
	// 		res.status(200).json({
	// 			data: response,
	// 		})
	// 	}catch (error){
	// 		next(error)
	// 	}
    // }

	// static async deleteJourney(req: Request, res: Response, next: NextFunction){
	// 	try{
	// 		const response = await ItineraryDestinationService.deleteItineraryDestination(Number(req.params.itineraryDestinationId))
	// 		res.status(200).json({
	// 			data: response,
	// 		})

	// 	}catch(error){
	// 		next(error)
	// 	}
	// }


	//Users

	static async addUser(req: UserRequest, res: Response, next: NextFunction){
		try{
			const request = req.body as AddItineraryUserRequest
			const response = await ItineraryUserService.addItineraryUser(request)
			res.status(200).json({
				data:response
			})
		}catch (error){
			next(error)
		}
	}

	// static async updateAccomodation(req: Request, res: Response, next: NextFunction) {
	// 	try {
	// 	  const itineraryDestinationId = Number(req.params.itineraryDestinationId);
	// 	  const accomodationData = req.body;
	  
	// 	  console.log(`API called: updateAccomodation`);
	// 	  console.log(`Request params: ${JSON.stringify(req.params)}`);
	// 	  console.log(`Request body: ${JSON.stringify(req.body)}`);
	  
	// 	  const response = await ItineraryDestinationService.updateItineraryDestinationAccomodation(
	// 		itineraryDestinationId,
	// 		accomodationData
	// 	  );
	  
	// 	  res.status(200).json({
	// 		data: response,
	// 	  });
	// 	} catch (error) {
	// 	  console.error(`Error in updateAccomodation: ${(error as Error).message}`);
	// 	  next(error);
	// 	}
	//   }

	// static async checkAccommodation(req: any, res: any, next: NextFunction) {
	// 	try {
	// 	  const itineraryDestinationId = parseInt(req.params.itineraryDestinationId, 10);
	
	// 	  // Validate the ID
	// 	  if (isNaN(itineraryDestinationId)) {
	// 		res.status(400).json({ error: "Invalid itinerary destination ID." });
	// 		return;
	// 	  }
	
	// 	  // Fetch the accommodation ID
	// 	  const accommodationId = await ItineraryDestinationService.getAccommodationId(itineraryDestinationId);
	
	// 	  res.status(200).json({ accommodation_id: accommodationId });
	// 	} catch (error) {
	// 	  console.error("Error in checkAccommodation:", error);
	// 	  next(error);
	// 	}
	//   }

	//   static async getAccommodationDetails(req: Request, res: Response, next: NextFunction) {
	// 	try {
	// 	  const accommodationId = parseInt(req.params.accommodationId, 10);
	  
	// 	  // Validate the ID
	// 	  if (isNaN(accommodationId)) {
	// 		res.status(400).json({ error: "Invalid accommodation ID." });
	// 		return;
	// 	  }
	  
	// 	  // Fetch the accommodation details
	// 	  const accommodation = await ItineraryDestinationService.getAccommodationDetails(accommodationId);
	  
	// 	  if (!accommodation) {
	// 		res.status(404).json({ error: "Accommodation not found." });
	// 		return;
	// 	  }
	  
	// 	  res.status(200).json({ data: accommodation });
	// 	} catch (error) {
	// 	  console.error("Error in getAccommodationDetails:", error);
	// 	  next(error);
	// 	}
	//   }


}