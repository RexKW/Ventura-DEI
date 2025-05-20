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
exports.RequestService = void 0;
const database_1 = require("../application/database");
const request_validation_1 = require("../validation/request-validation");
const validation_1 = require("../validation/validation");
class RequestService {
    static createRequest(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const validate_request = validation_1.Validation.validate(request_validation_1.RequestValidation.CREATE, req);
            const request = yield database_1.prismaClient.request.create({
                data: {
                    itinerary_id: validate_request.itinerary_id,
                    request: validate_request.request
                }
            });
        });
    }
}
exports.RequestService = RequestService;
