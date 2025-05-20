import { NextFunction, Request, Response } from "express";
import { ResponseError } from "../error/response-error";
import { ZodError } from "zod";


export const errorMiddleware = async (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) =>{
    if(error instanceof ZodError){
        res.status(400).json({
            errorMessage: `validation error: ${JSON.stringify}`
        })
    }else if(error instanceof ResponseError){
        res.status(400).json({
            errorMessage: error.message
        })
    } else{
        res.status(500).json({
            errorMessage: error.message
        })
    }
}