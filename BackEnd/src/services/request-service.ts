import { prismaClient } from "../application/database";
import { CreateRequest } from "../model/request-model";
import { RequestValidation } from "../validation/request-validation";
import { Validation } from "../validation/validation";

export class RequestService{
    static async createRequest(
        req: CreateRequest,
    ){
        const validate_request = Validation.validate(RequestValidation.CREATE, req);

        const request = await prismaClient.request.create({
            data:{
                itinerary_id: validate_request.itinerary_id,
                request: validate_request.request
            }
        });
    }
}