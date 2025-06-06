
import { toItineraryResponseList, ItineraryResponse, ItineraryExploreResponse, toItineraryResponse, CreateItineraryRequest, ItineraryUpdateRequest } from "../model/itinerary-model";
import { ActivityService } from "../services/activity-service"
import { CreateActivityRequest } from "../model/activity-model";
import { Validation } from "../validation/validation";
import { Itinerary, User } from "@prisma/client";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { ActivityValidation } from "../validation/activity-validation";
import { ItineraryValidation } from "../validation/itinerary-validation";
import { logger } from "../application/logging";
import { parse } from 'date-fns';
import { finished } from "stream";
import { Decimal } from "@prisma/client/runtime/library";
import { z, ZodType } from "zod";
import axios from "axios";
import OpenAI from 'openai';
import { error } from "console";



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

        const days = await prismaClient.schedule_Per_Day.findMany({
            where: { itinerary_id: itinerary1.id },
            orderBy: { date: "asc" },
        });

        const dayListForPrompt = days.map(d =>
            ({ id: d.id, date: d.date.toISOString().slice(0,10) })
        );

        const prompt = `
        You are a travel‐planning assistant.
        The user’s itinerary runs from ${startDate} to ${endDate}, and their request was:
        "${itinerary_Request.request}"

        An activity type can only have these types ["Transportation","Entertainment","Culinary","Accommodation","Others"]
        And a method is the method of transportation that can only have these methods ['Flight','Car','Train','Bus', 'Walk']
        location link uses a google map link of the location

        Here are the day records (use these exact IDs):
        ${JSON.stringify(dayListForPrompt, null, 2)}

        Make it as detailed as possible where per day it is precise

        Respond with *only* this JSON array (no backticks, no comments, no extra text):

        [
        {
            "day_id": 0,
            "name": "",
            "description": "",
            "start_time": "2025-05-27T09:00:00Z",
            "end_time":   "2025-05-27T11:00:00Z",
            "cost": 0,
            "type": "Transportation",
            "location_name": "",
            "location_address": "",
            "location_link": ""
        }
        ]

        if it is a transportation activity then this is the JSON format:
        [
        {
            "day_id": 0,
            "name": "",
            "description": "",
            "start_time": "2025-05-27T09:00:00Z",
            "end_time":   "2025-05-27T11:00:00Z",
            "cost": 0,
            "type": "Transportation",
            "location_name": "",
            "location_address": "",
            "location_link": "",
            "location_name2": "",
            "location_address2": "",
            "location_link2": "",
            "method": ""
        }
        ]
        `;



        const openai = new OpenAI({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey: process.env.API_KEY,
        });

        const completion = await openai.chat.completions.create({
            model: "deepseek/deepseek-chat-v3-0324:free",
            messages: [
            {
                "role": "user",
                "content": prompt.trim()
            }
            ],
            
        });
        console.log(completion.choices[0].message.content)

        let raw = completion.choices[0].message.content
        

        if (!raw) {
  throw new Error("AI returned no content");
}

raw = raw
  // remove leading ```json or ```json\n
  .replace(/^[\s`]*```?json\s*[\r\n]*/i, "")
  // remove any stray backticks
  .replace(/```/g, "")
  // remove trailing asterisks or backticks or whitespace
  .replace(/[\*`]+\s*$/, "")
  .trim();

console.log(raw)

// 2️⃣ Parse the JSON string
let parsedJson: unknown;
try {
  parsedJson = JSON.parse(raw);
} catch (e) {
  console.error("Invalid JSON from LLM:", raw);
  throw e;
}

// 3️⃣ (Optional) Validate the raw shape
const rawSug = ActivityValidation.RAWCREATEMANY
  .array()
  .parse(parsedJson);

// 4️⃣ Map into your domain type
const requests: CreateActivityRequest[] = rawSug.map(sug => ({
  day_id:           sug.day_id,
  name:             sug.name,
  description:      sug.description,
  start_time:       new Date(sug.start_time),
  end_time:         new Date(sug.end_time),
  cost:             new Decimal(sug.cost),
  type:             sug.type,
  location_name:    sug.location_name,
  location_address: sug.location_address,
  location_link:    sug.location_link,
  location_name2:   sug.location_name2 ?? null,
  location_address2:sug.location_address2 ?? null,
  location_link2:   sug.location_link2 ?? null,
  method:           sug.method ?? null,
}));

// 5️⃣ Re-validate with CREATEMANY by converting back to raw‐JSON shape
const activitiesToCreate = requests.map((req) => {
  // Build the “raw” object:
  const rawForValidation = {
    day_id:           req.day_id,
    name:             req.name,
    description:      req.description,
    start_time:       req.start_time.toISOString(),
    end_time:         req.end_time.toISOString(),
    cost:             req.cost.toNumber(),
    type:             req.type,
    location_name:    req.location_name,
    location_address: req.location_address,
    location_link:    req.location_link,
    location_name2:   req.location_name2,
    location_address2:req.location_address2,
    location_link2:   req.location_link2,
    method:           req.method,
  };

  // Validate that raw shape
  const validated = Validation.validate(
    ActivityValidation.CREATEMANY,
    rawForValidation
  );

  // Convert back into the final objects Prisma needs:
  return {
    day_id:           validated.day_id,
    name:             validated.name,
    description:      validated.description,
    start_time:       new Date(validated.start_time),
    end_time:         new Date(validated.end_time),
    cost:             validated.cost,
    type:             validated.type,
    location_name:    validated.location_name,
    location_address: validated.location_address,
    location_link:    validated.location_link,
    location_name2:   validated.location_name2,
    location_address2:validated.location_address2,
    location_link2:   validated.location_link2,
    method:           validated.method,
  };
});

// 6️⃣ Bulk‐insert in one go:
await prismaClient.activity.createMany({
  data: activitiesToCreate,
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



    static async generateTextRest(prompt: string): Promise<string> {
    const axios = require("axios");
    const url   = `https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText`;
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("Missing GENAI_API_KEY in env");
    }

    const res = await axios.post(
      url,
      {
        prompt: {
          text: prompt,
        },
        temperature: 0.7,
        maxOutputTokens: 256,
      },
      {
        params: { key: apiKey },
      }
    );

    const text = res.data.candidates?.[0]?.output;
    if (typeof text !== "string") {
      throw new Error("No text returned from GenAI");
    }
    return text;
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