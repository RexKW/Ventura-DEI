
import { toItineraryResponseList, ItineraryResponse, ItineraryExploreResponse, toItineraryResponse, CreateItineraryRequest, ItineraryUpdateRequest } from "../model/itinerary-model";
import { Validation } from "../validation/validation";
import { Itinerary, User } from "@prisma/client";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { ItineraryValidation } from "../validation/itinerary-validation";
import { logger } from "../application/logging";
import { parse } from 'date-fns';
import { finished } from "stream";

export class ItineraryService{
    // static async explore(): Promise<ItineraryExploreResponse[]>{
    //     const allItineraries = await prismaClient.itinerary.findMany()

    //     return toItineraryExploreResponseList(allItineraries)
    // }


    static async getAllItinerary(user: User): Promise<ItineraryResponse[]> {
        const itinerariesOwned = await prismaClient.itinerary_Users.findMany({
            where: {
                user_id: user.id,
                role: 'owner'
            },
        });

        const itineraryIds = itinerariesOwned.map((item) => item.itinerary_id);
        const itineraries = await prismaClient.itinerary.findMany({
            where: {
                id: { in: itineraryIds }
            }
        });

        const itinerariesWithUserCount: ItineraryResponse[] = [];
        for (const itinerary of itineraries) {
            const userCount = await prismaClient.itinerary_Users.count({
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

        return toItineraryResponseList(itinerariesWithUserCount);
    }

    static async getAllInvitedItinerary(user: User): Promise<ItineraryResponse[]> {
        const itinerariesOwned = await prismaClient.itinerary_Users.findMany({
            where: {
                user_id: user.id,
                role: {
                    in: ['admin','member']
                }
            },
        })

        const itineraryIds = itinerariesOwned.map((item) => item.itinerary_id);
        const itineraries = await prismaClient.itinerary.findMany({
            where:{
                id: { in: itineraryIds }
            }
        })

        const itinerariesWithUserCount = [];
        for(const itinerary of itineraries){
            const userCount = await prismaClient.itinerary_Users.count({
                where:{
                    itinerary_id : itinerary.id
                }
            })




            const itinerariesWithUser = {
                id: itinerary.id,
                name: itinerary.name,
                travellers: userCount,
                start_date: itinerary.start_date,
                end_date: itinerary.end_date,
                finished: itinerary.finished
            }

            itinerariesWithUserCount.push(itinerariesWithUser)

        }
        

        return toItineraryResponseList(itinerariesWithUserCount)
    }

    static async cloneItinerary(itinerary_id: number, user: User): Promise<String>{
        const itinerary = await this.checkItinerary(itinerary_id);
        const itinerary1 = await prismaClient.itinerary.create({
            data: {
                name: itinerary.name,
                created_date: new Date().toISOString(),
                updated_date: new Date().toISOString(),
                start_date: itinerary.start_date,
                end_date: itinerary.end_date
            },
        })
        const owner = await prismaClient.itinerary_Users.create({
            data:{
                user_id: user.id,
                itinerary_id: itinerary1.id,
                role: "owner"
            }
        })


    
            // Clone days for each destination
            const days = await prismaClient.schedule_Per_Day.findMany({
                where: { itinerary_id: itinerary1.id },
            });
    
            for (const day of days) {
                const daySchedule = await prismaClient.schedule_Per_Day.create({
                    data: {
                        itinerary_id: itinerary1.id,
                        date: day.date,
                    },
                });
    
                // Clone activities for each day
                const activities = await prismaClient.activity.findMany({
                    where: { day_id: day.id },
                });
    
                for (const activity of activities) {
                    await prismaClient.activity.create({
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
    }

    static async getItinerary(itinerary_id: number): Promise<ItineraryResponse> {
        const itinerary = await this.checkItinerary(itinerary_id);
        const userCount = await prismaClient.itinerary_Users.count({
            where: {
                itinerary_id: itinerary.id
            }
        });

        return toItineraryResponse(itinerary, userCount);
    }

    static async checkItinerary(itinerary_id: number): Promise<Itinerary> {
        const itinerary = await prismaClient.itinerary.findUnique({
            where: {
                id: itinerary_id
            },
        });

        if (!itinerary) {
            throw new ResponseError(400, "Itinerary not found!");
        }

        return itinerary;
    }


    


    static async createItinerary(
        req: CreateItineraryRequest,
        user: User
    ): Promise<Itinerary> {
        // validate request
        const itinerary_Request = Validation.validate(ItineraryValidation.CREATE, req)
        const [year, month, day] = itinerary_Request.start_date
        .split('-')
        .map(Number);
        const [eyear, emonth, eday] = itinerary_Request.end_date
        .split('-')
        .map(Number);
    
        const start = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
        const end = new Date(Date.UTC(eyear, emonth - 1, eday, 0, 0, 0));
        

        const itinerary1 = await prismaClient.itinerary.create({
            data: {
                name: itinerary_Request.name,
                start_date: start,
                end_date: end,
                created_date: new Date().toISOString(),
                updated_date: new Date().toISOString()
            },
        });

        const startDate = itinerary1.start_date
        const endDate = itinerary1.end_date
        const currentDate = startDate
        const datesToInsert = [];
        let batchCounter = 0;
        for (
            let dt = new Date(startDate);
            dt <= endDate;
            dt.setDate(dt.getDate() + 1)
          ) {
            datesToInsert.push({
              itinerary_id: itinerary1.id,
              date:          new Date(dt), 
            })
          }
        await prismaClient.schedule_Per_Day.createMany({
            data: datesToInsert,
        });

        await prismaClient.itinerary_Users.create({
            data: {
                user_id: user.id,
                itinerary_id: itinerary1.id,
                role: "owner"
            }
        })

        await prismaClient.request.create({
            data:{
                itinerary_id: itinerary1.id,
                request: itinerary_Request.request
            }
        })


        await prismaClient.budget.create({
            data:{
                itinerary_id: itinerary1.id,
                estimated_budget: itinerary_Request.accomodation_budget,
                type: "accomodation"
            }
        })

        await prismaClient.budget.create({
            data:{
                itinerary_id: itinerary1.id,
                estimated_budget: itinerary_Request.transporation_budget,
                type: "transportation"
            }
        })

        await prismaClient.budget.create({
            data:{
                itinerary_id: itinerary1.id,
                estimated_budget: itinerary_Request.entertainment_budget,
                type: "entertainment"
            }
        })

        await prismaClient.budget.create({
            data:{
                itinerary_id: itinerary1.id,
                estimated_budget: itinerary_Request.culinary_budget,
                type: "culinary"
            }
        })

        await prismaClient.budget.create({
            data:{
                itinerary_id: itinerary1.id,
                estimated_budget: itinerary_Request.misc_budget,
                type: "miscellaneous"
            }
        })

        

        return itinerary1
    }


    static async updateItinerary(
        req: ItineraryUpdateRequest
    ): Promise<string> {
        const itinerary = Validation.validate(ItineraryValidation.UPDATE, req)

        await this.checkItinerary(itinerary.id)

        const itineraryUpdate = await prismaClient.itinerary.update({
            where: {
                id: itinerary.id,
            },
            data: itinerary,
        });

        logger.info("UPDATE RESULT: " + itineraryUpdate);

        return "Data update was successful!";
    }

    static async deleteItinerary(id: number): Promise<string> {
        await this.checkItinerary(id);

        await prismaClient.itinerary.delete({
            where: {
                id: id,
            },
        });

        return "Data has been deleted successfully!";
    }
}