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
exports.ItineraryController = void 0;
// import { AddItineraryDestinationRequest, UpdateItineraryDestinationRequest } from "../model/itinerary-destinations-model";
const itinerary_service_1 = require("../services/itinerary-service");
const itinerary_users_service_1 = require("../services/itinerary-users-service");
class ItineraryController {
    static getItinerary(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield itinerary_service_1.ItineraryService.getItinerary(Number(req.params.itineraryId));
                res.status(200).json({
                    data: response,
                });
            }
            catch (error) {
                next(error);
            }
        });
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
    static getAllItinerary(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield itinerary_service_1.ItineraryService.getAllItinerary(req.user);
                res.status(200).json({
                    data: response,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getAllInvitedItinerary(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield itinerary_service_1.ItineraryService.getAllInvitedItinerary(req.user);
                res.status(200).json({
                    data: response,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static createNewItinerary(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = yield itinerary_service_1.ItineraryService.createItinerary(request, req.user);
                res.status(200).json({
                    data: response,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static deleteItinerary(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield itinerary_service_1.ItineraryService.deleteItinerary(Number(req.params.itineraryId));
                res.status(200).json({
                    data: response,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static updateItinerary(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                request.id = Number(req.params.itineraryId);
                const response = yield itinerary_service_1.ItineraryService.updateItinerary(request);
                res.status(200).json({
                    data: response,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static cloneItinerary(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.itineraryId);
                const response = yield itinerary_service_1.ItineraryService.cloneItinerary(id, req.user);
                res.status(200).json({
                    data: response,
                });
            }
            catch (error) {
            }
        });
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
    static addUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = yield itinerary_users_service_1.ItineraryUserService.addItineraryUser(request);
                res.status(200).json({
                    data: response
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.ItineraryController = ItineraryController;
