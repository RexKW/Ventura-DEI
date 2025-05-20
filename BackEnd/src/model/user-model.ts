import { User } from "@prisma/client";

export interface RegisterUserRequest{
    username: string
    email: string
    password:string
}

export interface UserResponse{
    id: number
    token?: string
    email: string
    username: string
    password: string

}

export interface LoginUserRequest {
    email: string
    password: string
}

export function toUserResponse (user: User):UserResponse {
    return{
        id: user.id,
        token: user.token ?? "",
        email: user.email,
        username: user.username,
        password: user.password
    }
}