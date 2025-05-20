import { NextFunction, Request, Response } from "express";
import { LoginUserRequest, RegisterUserRequest, UserResponse } from "../model/user-model";
import { UserService } from "../services/auth-service";
import { ItineraryUserService } from "../services/itinerary-users-service";
import { UserRequest } from "../types/user-request";

export class AuthController{
    static async register(req: Request, res: Response, next: NextFunction){
        try{
            const request: RegisterUserRequest = req.body as RegisterUserRequest
            const response: UserResponse = await UserService.register(request)

            res.status(200).json({
                data: response
            })
        } catch (error){
            next(error)
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const request = req.body as LoginUserRequest
            const response = await UserService.login(request)

            res.status(200).json({
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }

    static async logout(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await UserService.logout(req.user!)

            res.status(200).json({
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }

    static async getUser(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await UserService.getUser(req.user!)

            res.status(200).json({
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }

    static async allUsers(req: Request, res: Response, next: NextFunction){
        try{
            const response = await ItineraryUserService.getAllUsers()

            res.status(200).json({
                data: response
            })
        }catch (error){
            next(error)
        }
    }   

    static async userRole(req: UserRequest, res: Response, next: NextFunction){
        try{
            const itinerary_id = parseInt(req.params.itineraryId, 10)
                        const response = await ItineraryUserService.getUserRole(req.user!, itinerary_id)
                        res.status(200).json({
                            data:response
                        })
        }catch(error){
            next(error)
        }
    }
}