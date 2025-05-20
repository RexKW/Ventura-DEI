import { NextFunction, Request, response, Response } from "express";
import { UserService } from "../services/auth-service";
import { ActivityUpdateRequest, CreateActivityRequest} from "../model/activity-model";
import { ActivityService } from "../services/activity-service";
import { DayService } from "../services/day-service";
import { prismaClient } from "../application/database";

function addLeadingZero(time: string): string { 
    return time.length === 4 ? `0${time}` : time; 
}

export class ActivityController{
    static async getDay(req: Request, res: Response, next: NextFunction){
        try{
            const dayId = Number(req.params.dayId)
            const response = await DayService.getDay(dayId)

            res.status(200).json({
                data: response
            })
        }catch(error){
            next(error)
        }
    }

    static async getAllDays(req: Request, res: Response, next: NextFunction){
        try{
            const itineraryDestinationId = Number(req.params.itineraryDestinationId)
            const response = await DayService.getAllDays(itineraryDestinationId)

            res.status(200).json({
                data: response
            })
        } catch (error){
            next(error)
        }
    }

    static async getAllActivities(req: Request, res: Response, next: NextFunction) {
        try {
            const dayId = Number(req.params.dayId);
            const response = await ActivityService.getAllActivity(dayId)

            res.status(200).json({
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }

    static async getActivity(req: Request, res: Response, next: NextFunction) {
        try {
            const activityId = Number(req.params.activityId)
            const response = await ActivityService.getActivity(activityId)

            res.status(200).json({
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }

    static async createActivities(
        req: Request,
        res: Response,
        next: NextFunction
      ) {
        try {
          const requests = req.body as Array<
            CreateActivityRequest 
          >;
          const message = await ActivityService.createActivities(requests);
    
          res.status(200).json({
            message,
          });
        } catch (error) {
          next(error);
        }
      }

    static async createActivity(req: Request, res: Response, next: NextFunction){
        try{
            const request = req.body as CreateActivityRequest
            const dayId = Number(req.params.dayId);
            const day = await prismaClient.schedule_Per_Day.findUnique({
                where:{
                    id: dayId
                }
            })

            const timeRequest = { 
                ...request, 
                start_time: new Date(req.body.start_time), 
                end_time: new Date(req.body.end_time) 
            };
            const response = await ActivityService.createActivity(dayId,timeRequest)


            res.status(200).json({
                data: response
            })

        }catch (error){
            next(error)
        }
    }

    static async deleteActivity(req: Request, res: Response, next: NextFunction){
        try{
            const activityId = Number(req.params.activityId)
            const response = await ActivityService.deleteActivity(activityId)

            res.status(200).json({
                data: response
            })

        }catch(error){
            next(error)
        }
    }

    static async updateActivity(req: Request, res: Response, next: NextFunction){

        try{
            const request = req.body as ActivityUpdateRequest
            const activityId = Number(req.params.activityId)
            const start_time = addLeadingZero(`${request.start_time}`);
            const end_time = addLeadingZero(`${request.end_time}`)
            const dayId = req.body.day_id;
            const day = await prismaClient.schedule_Per_Day.findUnique({
                where:{
                    id: dayId
                }
            })

            const dayString = day?.date.toISOString().split('T')[0];
            const startDateTime = new Date(`${dayString}T${start_time}:00.000Z`).toISOString();
            const endDateTime = new Date(`${dayString}T${end_time}:00.000Z`).toISOString();
            const timeRequest = {  
                ...request, 
                start_time: new Date(startDateTime), 
                end_time: new Date(endDateTime) 
            };
            console.log(timeRequest)
            const response = await ActivityService.updateActivity(activityId, timeRequest)

            res.status(200).json({
                data: response
            })


        }catch(error){
            next(error)
        }
    }

    
}

