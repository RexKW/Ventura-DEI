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
exports.ItineraryService = void 0;
const itinerary_model_1 = require("../model/itinerary-model");
const validation_1 = require("../validation/validation");
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
const itinerary_validation_1 = require("../validation/itinerary-validation");
const logging_1 = require("../application/logging");
class ItineraryService {
    // static async explore(): Promise<ItineraryExploreResponse[]>{
    //     const allItineraries = await prismaClient.itinerary.findMany()
    //     return toItineraryExploreResponseList(allItineraries)
    // }
    static getAllItinerary(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const itinerariesOwned = yield database_1.prismaClient.itinerary_Users.findMany({
                where: {
                    user_id: user.id,
                    role: 'owner'
                },
            });
            const itineraryIds = itinerariesOwned.map((item) => item.itinerary_id);
            const itineraries = yield database_1.prismaClient.itinerary.findMany({
                where: {
                    id: { in: itineraryIds }
                }
            });
            const itinerariesWithUserCount = [];
            for (const itinerary of itineraries) {
                const userCount = yield database_1.prismaClient.itinerary_Users.count({
                    where: {
                        itinerary_id: itinerary.id
                    }
                });
                const itinerariesWithUser = {
                    id: itinerary.id,
                    name: itinerary.name,
                    travellers: userCount,
                    start_date: itinerary.start_date,
                    end_date: itinerary.end_date,
                    finished: itinerary.finished
                };
                itinerariesWithUserCount.push(itinerariesWithUser);
            }
            return (0, itinerary_model_1.toItineraryResponseList)(itinerariesWithUserCount);
        });
    }
    static getAllInvitedItinerary(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const itinerariesOwned = yield database_1.prismaClient.itinerary_Users.findMany({
                where: {
                    user_id: user.id,
                    role: {
                        in: ['admin', 'member']
                    }
                },
            });
            const itineraryIds = itinerariesOwned.map((item) => item.itinerary_id);
            const itineraries = yield database_1.prismaClient.itinerary.findMany({
                where: {
                    id: { in: itineraryIds }
                }
            });
            const itinerariesWithUserCount = [];
            for (const itinerary of itineraries) {
                const userCount = yield database_1.prismaClient.itinerary_Users.count({
                    where: {
                        itinerary_id: itinerary.id
                    }
                });
                const itinerariesWithUser = {
                    id: itinerary.id,
                    name: itinerary.name,
                    travellers: userCount,
                    start_date: itinerary.start_date,
                    end_date: itinerary.end_date,
                    finished: itinerary.finished
                };
                itinerariesWithUserCount.push(itinerariesWithUser);
            }
            return (0, itinerary_model_1.toItineraryResponseList)(itinerariesWithUserCount);
        });
    }
    static cloneItinerary(itinerary_id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const itinerary = yield this.checkItinerary(itinerary_id);
            const itinerary1 = yield database_1.prismaClient.itinerary.create({
                data: {
                    name: itinerary.name,
                    created_date: new Date().toISOString(),
                    updated_date: new Date().toISOString(),
                    start_date: itinerary.start_date,
                    end_date: itinerary.end_date
                },
            });
            const owner = yield database_1.prismaClient.itinerary_Users.create({
                data: {
                    user_id: user.id,
                    itinerary_id: itinerary1.id,
                    role: "owner"
                }
            });
            // Clone days for each destination
            const days = yield database_1.prismaClient.schedule_Per_Day.findMany({
                where: { itinerary_id: itinerary1.id },
            });
            for (const day of days) {
                const daySchedule = yield database_1.prismaClient.schedule_Per_Day.create({
                    data: {
                        itinerary_id: itinerary1.id,
                        date: day.date,
                    },
                });
                // Clone activities for each day
                const activities = yield database_1.prismaClient.activity.findMany({
                    where: { day_id: day.id },
                });
                for (const activity of activities) {
                    yield database_1.prismaClient.activity.create({
                        data: {
                            location_name: activity.location_name,
                            location_link: activity.location_link,
                            location_address: activity.location_address,
                            location_name2: activity.location_name2,
                            location_link2: activity.location_link2,
                            location_address2: activity.location_address2,
                            day_id: daySchedule.id,
                            description: activity.description,
                            start_time: activity.start_time,
                            end_time: activity.end_time,
                            name: activity.name,
                            cost: activity.cost,
                            type: activity.type,
                        },
                    });
                }
            }
            return "Data Cloned";
        });
    }
    static getItinerary(itinerary_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const itinerary = yield this.checkItinerary(itinerary_id);
            const userCount = yield database_1.prismaClient.itinerary_Users.count({
                where: {
                    itinerary_id: itinerary.id
                }
            });
            return (0, itinerary_model_1.toItineraryResponse)(itinerary, userCount);
        });
    }
    static checkItinerary(itinerary_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const itinerary = yield database_1.prismaClient.itinerary.findUnique({
                where: {
                    id: itinerary_id
                },
            });
            if (!itinerary) {
                throw new response_error_1.ResponseError(400, "Itinerary not found!");
            }
            return itinerary;
        });
    }
    static createItinerary(req, user) {
        return __awaiter(this, void 0, void 0, function* () {
            // validate request
            const itinerary_Request = validation_1.Validation.validate(itinerary_validation_1.ItineraryValidation.CREATE, req);
            const [year, month, day] = itinerary_Request.start_date
                .split('-')
                .map(Number);
            const [eyear, emonth, eday] = itinerary_Request.end_date
                .split('-')
                .map(Number);
            const start = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
            const end = new Date(Date.UTC(eyear, emonth - 1, eday, 0, 0, 0));
            const itinerary1 = yield database_1.prismaClient.itinerary.create({
                data: {
                    name: itinerary_Request.name,
                    start_date: start,
                    end_date: end,
                    created_date: new Date().toISOString(),
                    updated_date: new Date().toISOString()
                },
            });
            const startDate = itinerary1.start_date;
            const endDate = itinerary1.end_date;
            const currentDate = startDate;
            const datesToInsert = [];
            let batchCounter = 0;
            for (let dt = new Date(startDate); dt <= endDate; dt.setDate(dt.getDate() + 1)) {
                datesToInsert.push({
                    itinerary_id: itinerary1.id,
                    date: new Date(dt),
                });
            }
            yield database_1.prismaClient.schedule_Per_Day.createMany({
                data: datesToInsert,
            });
            yield database_1.prismaClient.itinerary_Users.create({
                data: {
                    user_id: user.id,
                    itinerary_id: itinerary1.id,
                    role: "owner"
                }
            });
            yield database_1.prismaClient.request.create({
                data: {
                    itinerary_id: itinerary1.id,
                    request: itinerary_Request.request
                }
            });
            yield database_1.prismaClient.budget.create({
                data: {
                    itinerary_id: itinerary1.id,
                    estimated_budget: itinerary_Request.accomodation_budget,
                    type: "accomodation"
                }
            });
            yield database_1.prismaClient.budget.create({
                data: {
                    itinerary_id: itinerary1.id,
                    estimated_budget: itinerary_Request.transporation_budget,
                    type: "transportation"
                }
            });
            yield database_1.prismaClient.budget.create({
                data: {
                    itinerary_id: itinerary1.id,
                    estimated_budget: itinerary_Request.entertainment_budget,
                    type: "entertainment"
                }
            });
            yield database_1.prismaClient.budget.create({
                data: {
                    itinerary_id: itinerary1.id,
                    estimated_budget: itinerary_Request.culinary_budget,
                    type: "culinary"
                }
            });
            yield database_1.prismaClient.budget.create({
                data: {
                    itinerary_id: itinerary1.id,
                    estimated_budget: itinerary_Request.misc_budget,
                    type: "miscellaneous"
                }
            });
            return itinerary1;
        });
    }
    static updateItinerary(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const itinerary = validation_1.Validation.validate(itinerary_validation_1.ItineraryValidation.UPDATE, req);
            yield this.checkItinerary(itinerary.id);
            const itineraryUpdate = yield database_1.prismaClient.itinerary.update({
                where: {
                    id: itinerary.id,
                },
                data: itinerary,
            });
            logging_1.logger.info("UPDATE RESULT: " + itineraryUpdate);
            return "Data update was successful!";
        });
    }
    static deleteItinerary(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkItinerary(id);
            yield database_1.prismaClient.itinerary.delete({
                where: {
                    id: id,
                },
            });
            return "Data has been deleted successfully!";
        });
    }
}
exports.ItineraryService = ItineraryService;
