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
const itinerary_service_1 = require("../services/itinerary-service");
const itinerary_destinations_service_1 = require("../services/itinerary-destinations-service");
const itinerary_users_service_1 = require("../services/itinerary-users-service");
class ItineraryController {
    static getItinerary(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield itinerary_service_1.ItineraryService.getItinerary(Number(req.params.todoId));
                res.status(200).json({
                    data: response,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getAllItinerary(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const user = req.user; // Ensure user is available on the request object
                if (!user) {
                    throw new Error("User is not authenticated");
                }
                const response = yield itinerary_service_1.ItineraryService.getAllItinerary(Object.assign(Object.assign({}, user), { id: Number(user.id), token: (_a = user.token) !== null && _a !== void 0 ? _a : null }));
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
            var _a;
            try {
                const user = req.user; // Ensure user is available on the request object
                if (!user) {
                    throw new Error("User is not authenticated");
                }
                const request = req.body;
                // const response = yield itinerary_service_1.ItineraryService.createItinerary(request, Object.assign(Object.assign({}, user), { id: Number(user.id), token: (_a = user.token) !== null && _a !== void 0 ? _a : null }));
                // res.status(201).json({
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
                const response = yield itinerary_service_1.ItineraryService.deleteItinerary(Number(req.params.todoId));
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
                res.status(201).json({
                    data: response,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    //Destinations 
    static selectDestination(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                request.destination_id = Number(req.params.destinationId);
                const dateRequest = Object.assign(Object.assign({}, request), { start_date: new Date(request.start_date), end_date: new Date(request.end_date) });
                const response = yield itinerary_destinations_service_1.ItineraryDestinationService.createItineraryDestination(dateRequest, req.user);
                res.status(200).json({
                    data: response,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static allJourney(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const itinerary_id = parseInt(req.params.itineraryId, 10);
                const response = yield itinerary_destinations_service_1.ItineraryDestinationService.getAllItinenaryDestination(itinerary_id);
                res.status(200).json({
                    data: response
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    //Users
    static addUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = yield itinerary_users_service_1.ItineraryUserService.addItineraryUser(request);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.ItineraryController = ItineraryController;
