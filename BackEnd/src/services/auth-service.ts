import { UUID } from "crypto";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { RegisterUserRequest, toUserResponse, UserResponse,LoginUserRequest } from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Itinerary, User } from "@prisma/client";
import { Validation } from "../validation/validation";
import {v4 as uuid} from "uuid"
import bcrypt from "bcrypt"
import { PrismaClient } from "@prisma/client";

export class UserService{
    static async register(req: RegisterUserRequest): Promise<UserResponse>{
        const registerReq = Validation.validate(
            UserValidation.REGISTER,req
        )


        const email = await prismaClient.user.findFirst({
            where:{
                email: registerReq.email
            },
        })

        if(email){
            throw new ResponseError(400, "Email already exists!")
        }else{
          registerReq.password  = await bcrypt.hash(registerReq.password, 10)
        }

        const user = await prismaClient.user.create({
            data:{
                username: registerReq.username,
                email: registerReq.email,
                password: registerReq.password,
                token: uuid()
            }
        })

        return toUserResponse(user)
    }

    static async login(request: LoginUserRequest): Promise<UserResponse> {
        const loginRequest = Validation.validate(UserValidation.LOGIN, request)

        let user = await prismaClient.user.findFirst({
            where: {
                email: loginRequest.email,
            },
        })

        if (!user) {
            throw new ResponseError(400, "Invalid email or password!")
        }

        const passwordIsValid = await bcrypt.compare(
            loginRequest.password,
            user.password
        )

        if (!passwordIsValid) {
            throw new ResponseError(400, "Invalid email or password!")
        }

        user = await prismaClient.user.update({
            where: {
                id: user.id,
            },
            data: {
                token: uuid(),
            },
        })

        const response = toUserResponse(user)

        return response
    }

    static async logout(user: User): Promise<UserResponse> {

        if (!user) {
            throw new ResponseError(400, "Invalid email or password!")
        }


        user = await prismaClient.user.update({
            where: {
                id: user.id,
            },
            data: {
                token: null,
            },
        })

        const response = toUserResponse(user)

        return response
    }


    static async getAllUsers(){
        const userList = await prismaClient.user.findMany()


        return userList


    }

    static async getUser( user: User){
        return user
    }
}