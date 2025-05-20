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
exports.ActivityController = void 0;
const activity_service_1 = require("../services/activity-service");
const day_service_1 = require("../services/day-service");
const database_1 = require("../application/database");
function addLeadingZero(time) {
    return time.length === 4 ? `0${time}` : time;
}
class ActivityController {
    static getDay(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dayId = Number(req.params.dayId);
                const response = yield day_service_1.DayService.getDay(dayId);
                res.status(200).json({
                    data: response
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getAllDays(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const itineraryDestinationId = Number(req.params.itineraryDestinationId);
                const response = yield day_service_1.DayService.getAllDays(itineraryDestinationId);
                res.status(200).json({
                    data: response
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getAllActivities(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dayId = Number(req.params.dayId);
                const response = yield activity_service_1.ActivityService.getAllActivity(dayId);
                res.status(200).json({
                    data: response,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getActivity(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const activityId = Number(req.params.activityId);
                const response = yield activity_service_1.ActivityService.getActivity(activityId);
                res.status(200).json({
                    data: response,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static createActivities(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const requests = req.body;
                const message = yield activity_service_1.ActivityService.createActivities(requests);
                res.status(200).json({
                    message,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static createActivity(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const dayId = Number(req.params.dayId);
                const day = yield database_1.prismaClient.schedule_Per_Day.findUnique({
                    where: {
                        id: dayId
                    }
                });
                const timeRequest = Object.assign(Object.assign({}, request), { start_time: new Date(req.body.start_time), end_time: new Date(req.body.end_time) });
                const response = yield activity_service_1.ActivityService.createActivity(dayId, timeRequest);
                res.status(200).json({
                    data: response
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static deleteActivity(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const activityId = Number(req.params.activityId);
                const response = yield activity_service_1.ActivityService.deleteActivity(activityId);
                res.status(200).json({
                    data: response
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static updateActivity(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const activityId = Number(req.params.activityId);
                const start_time = addLeadingZero(`${request.start_time}`);
                const end_time = addLeadingZero(`${request.end_time}`);
                const dayId = req.body.day_id;
                const day = yield database_1.prismaClient.schedule_Per_Day.findUnique({
                    where: {
                        id: dayId
                    }
                });
                const dayString = day === null || day === void 0 ? void 0 : day.date.toISOString().split('T')[0];
                const startDateTime = new Date(`${dayString}T${start_time}:00.000Z`).toISOString();
                const endDateTime = new Date(`${dayString}T${end_time}:00.000Z`).toISOString();
                const timeRequest = Object.assign(Object.assign({}, request), { start_time: new Date(startDateTime), end_time: new Date(endDateTime) });
                console.log(timeRequest);
                const response = yield activity_service_1.ActivityService.updateActivity(activityId, timeRequest);
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
exports.ActivityController = ActivityController;
