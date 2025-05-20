import { NextFunction, Request, response, Response } from "express";
import { CreateRequest } from "../model/request-model";
import { RequestService } from "../services/request-service";

export class RequestController{
    static async createRequest(req: Request, res: Response, next: NextFunction){
        try{
             const request = req.body as CreateRequest
             const response = await RequestService.createRequest(request)
            res.status(200).json({ data: response });
        }catch (error){
            next(error);
        }
    }
}