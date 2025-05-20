import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/auth-service";
import { UserRequest } from "../types/user-request";
import { ActualBudgetResponse, CreateBudgetRequest } from "../model/budget-model";
import { BudgetService } from "../services/budget-service";
import { User } from "@prisma/client";

export class BudgetController{
    static async actualBudget(req: UserRequest, res: Response, next: NextFunction){
        try{
            const id = Number(req.params.itineraryId)
            const response: ActualBudgetResponse = await BudgetService.getSpendings(id)

            res.status(200).json({
                data: response
            })
        } catch (error){
            next(error)
        }
    }

    static async plannedBudget(req: UserRequest, res: Response, next: NextFunction){
        try{
            const id = Number(req.params.itineraryId)
            const response = await BudgetService.getPlannedBudget(id)

            res.status(200).json({
                data: response
            })
        } catch (error){
            next(error)
        }
    }

    static async createBudget(req: UserRequest, res: Response, next: NextFunction){
        try{
            const request = req.body as CreateBudgetRequest
            const id = Number(req.params.itineraryId)
            const response = await BudgetService.setBudget(request, id)

            res.status(200).json({
                data: response
            })
        } catch (error){
            next(error)
        }
    }

    static async updateBudget(req: UserRequest, res: Response, next: NextFunction){
        try{
            const request = req.body as CreateBudgetRequest
            const id = Number(req.params.itineraryId)
            const response = await BudgetService.updateBudget(request, id)

            res.status(200).json({
                data: response
            })
        } catch (error){
            next(error)
        }
    }
}