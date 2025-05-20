import { Decimal } from "@prisma/client/runtime/library";
import { prismaClient } from "../application/database";
import { Accomodation } from "@prisma/client";
import { CreateAcomodationRequest } from "../model/accomodation-model";

export class AccomodationService {
    static async createAccomodation(
      req: CreateAcomodationRequest
    )
    : Promise<Accomodation> 
    {
     
      const  accomodation = await prismaClient.accomodation.create({
          data: {
            itinerary_id: req.itinerary_id,
            name: req.name,
            address: req.address,
            cost: req.cost,
            people: req.people,
            location_link: req.location_link , 

          },
        });
  
      return accomodation;
    }
  }