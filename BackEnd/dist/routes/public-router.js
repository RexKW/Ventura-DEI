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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user-controller");
const axios_1 = __importDefault(require("axios"));
exports.publicRouter = express_1.default.Router();
exports.publicRouter.post("/api/register", user_controller_1.AuthController.register);
exports.publicRouter.post("/api/login", user_controller_1.AuthController.login);
exports.publicRouter.get('/hotel-offers', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query, radius = '5', radiusUnit = 'KM' } = req.query;
        // Replace with your actual token
        const AMADEUS_TOKEN = 'YOUR_IMMEDIATE_ACCESS_TOKEN';
        const amadeusRes = yield axios_1.default.get('https://test.api.amadeus.com/v2/shopping/hotel-offers', {
            headers: { Authorization: `Bearer ${AMADEUS_TOKEN}` },
            params: { query, radius, radiusUnit },
        });
        // forward the JSON exactly as Amadeus sent it
        res.json(amadeusRes.data);
    }
    catch (err) {
        console.error('Error proxying hotel-offers:', err);
        next(err);
    }
}));
