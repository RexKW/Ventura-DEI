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
exports.AccomodationController = void 0;
const accomodation_service_1 = require("../services/accomodation-service");
const library_1 = require("@prisma/client/runtime/library");
class AccomodationController {
    static createAccomodation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { itinerary_id, name, address, location_link, cost, people, } = req.query;
                // Validate required fields
                if (!itinerary_id || !name || !address || !location_link || cost === undefined) {
                    throw new Error("Missing required fields: place_id, name, address, place_api, categories, cost, or people.");
                }
                // Normalize categories
                // Pass the data to AccomodationService
                const accomodation = yield accomodation_service_1.AccomodationService.createAccomodation({
                    itinerary_id: Number(itinerary_id),
                    name,
                    address,
                    location_link: location_link, // Default image
                    cost: new library_1.Decimal(cost), // Convert to number
                    people: parseInt(people), // Convert to number
                });
                // Respond with the accommodation data
                res.status(200).json({ data: accomodation });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getAccomodations(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    static getSavedAccomodations(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const savedAccommodation = yield accomodation_service_1.AccomodationService;
                res.status(200).json({ data: savedAccommodation });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.AccomodationController = AccomodationController;
