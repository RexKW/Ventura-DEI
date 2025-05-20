
import {  ItineraryResponse, toItineraryResponse, CreateItineraryRequest, ItineraryUpdateRequest } from "../model/itinerary-model";
import { Validation } from "../validation/validation";
import { ItineraryUserResponse, toItineraryUserResponseList,toItineraryUserResponse, AddItineraryUserRequest } from "../model/itinerary-users-model";
import { Activity, Itinerary,  Schedule_Per_Day, User } from "@prisma/client"
import { prismaClient } from "../application/database"
import { ResponseError } from "../error/response-error"
import { ItineraryUserValidation } from "../validation/itinerary-user-validation";
import { logger } from "../application/logging"

export class ItineraryUserService{
    static async getAllItineraryUsers(itinerary: Itinerary): Promise<ItineraryUserResponse[]> {
        const itinerary_users = await prismaClient.itinerary_Users.findMany({
            where: {
                itinerary_id: itinerary.id,
            },
        })

        

        return toItineraryUserResponseList(itinerary_users)
    }

    static async getAllUsers(){
        const users = await prismaClient.user.findMany()
        return users
    }

    static async getUserRole(user: User, itineraryId:number): Promise<String>{
        const userItinerary = await prismaClient.itinerary_Users.findUnique({
            where: {
                user_id_itinerary_id_unique: {
                    user_id: user.id,
                    itinerary_id: itineraryId,
                },
            },
        });

        if(userItinerary){
            return userItinerary.role
        }else{
            return "Not in Itinerary"
        }

       
    }


    static async addItineraryUser(req: AddItineraryUserRequest ){
        const itinerary_user_request = Validation.validate(ItineraryUserValidation.CREATE, req) 
        const checkUserItinerary = await prismaClient.itinerary_Users.findUnique({
            where: {
                user_id_itinerary_id_unique: {
                    user_id: itinerary_user_request.user_id,
                    itinerary_id: itinerary_user_request.itinerary_id,
                },
            },
        });
        if(!checkUserItinerary){
            const itinerary_user = await prismaClient.itinerary_Users.create({
                data:{
                    itinerary_id: itinerary_user_request.itinerary_id,
                    user_id: itinerary_user_request.user_id,
                    role: "member"
                }
            })
        }
    }
    
    static async kickUser(itinerary: Itinerary, user:User): Promise<String> {
        const getUser = await prismaClient.itinerary_Users.findUnique({
            where: {
                user_id_itinerary_id_unique: {
                    user_id: user.id,
                    itinerary_id: itinerary.id,
                },
            }
        })

        if(getUser?.role === "owner"){
            await prismaClient.itinerary_Users.delete({
                where: {
                    user_id_itinerary_id_unique: {
                        user_id: user.id,
                        itinerary_id: itinerary.id,
                    },
                }
            })
        }

        return "User has been kicked successfully!"
    }




    static async updateUserRole(
        changer: User,
        changed: User,
        itinerary: Itinerary
    ): Promise<string> {
        const userChanger = await prismaClient.itinerary_Users.findUnique({
            where: {
                user_id_itinerary_id_unique: {
                    user_id: changer.id,
                    itinerary_id: itinerary.id,
                },
            }
        })

        if(userChanger?.role == "owner" || userChanger?.role == "admin"){
            const userChanged = await prismaClient.itinerary_Users.findUnique({
                where: {
                    user_id_itinerary_id_unique: {
                        user_id: changed.id,
                        itinerary_id: itinerary.id,
                    },
                }
            })

            if(userChanged?.role=="admin"){
                const userUpdate = await prismaClient.itinerary_Users.update({
                    where: {
                        user_id_itinerary_id_unique: {
                            user_id: userChanged.id,
                            itinerary_id: itinerary.id,
                        },
                    },
                    data: {
                        role: "member"
                    }
                })
            }else if(userChanged?.role=="member"){
                const userUpdate = await prismaClient.itinerary_Users.update({
                    where: {
                        user_id_itinerary_id_unique: {
                            user_id: userChanged.id,
                            itinerary_id: itinerary.id,
                        },
                    },
                    data: {
                        role: "admin"
                    }
                })
            }else if(userChanged?.role=="owner"){
                return "Can't change owner role"
            }
        }

        return "Data update was successful!"
    }
    
}