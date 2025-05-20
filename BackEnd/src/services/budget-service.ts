
import { prismaClient } from "../application/database"
import { ActualBudgetResponse, BudgetResponse, CreateBudgetRequest, toBudgetResponse, toBudgetResponseList } from "../model/budget-model";
import { Decimal } from "@prisma/client/runtime/library";



export class BudgetService{
    static async getPlannedBudget(itinerary_id: number): Promise<BudgetResponse[]>{
        const plannedBudget = await prismaClient.budget.findMany({
            where: {
                itinerary_id: itinerary_id
            },
        })


        return toBudgetResponseList(plannedBudget)
    }

    static async getSpendings(itinerary_id: number): Promise<ActualBudgetResponse> {
        const allAccomodations = await prismaClient.accomodation.findMany({
            where: {
                itinerary_id: itinerary_id,
            },
        });

        const allDays = await prismaClient.schedule_Per_Day.findMany({
            where: {
                itinerary_id: itinerary_id
            }
        })
    
        let totalAccomodation = new Decimal(0);
        let totalTransport = new Decimal(0);
        let totalShoppingEntertainment = new Decimal(0);
        let totalCulinary = new Decimal(0);
        let totalSightSeeing = new Decimal(0);
        let totalHealthcare = new Decimal(0);
        let totalSport = new Decimal(0);
    
        // Calculate accommodations
        for (const accomodation of allAccomodations) {

    
                if (accomodation && accomodation.cost) {
                    totalAccomodation = totalAccomodation.plus(new Decimal(accomodation.cost));
                }
            
        }
    
        // Calculate spendings for each destination
        
            for (const day of allDays) {
                const activities = await prismaClient.activity.findMany({
                    where: {
                        day_id: day.id,
                    },
                });
    
                for (const activity of activities) {
                    switch (activity.type) {
                        case "Transport":
                            totalTransport = totalTransport.plus(new Decimal(activity.cost));
                            break;
                        case "Entertainment":
                            totalShoppingEntertainment = totalShoppingEntertainment.plus(new Decimal(activity.cost));
                            break;
                        case "Culinary":
                            totalCulinary = totalCulinary.plus(new Decimal(activity.cost));
                            break;
                        case "Misc":
                            totalHealthcare = totalHealthcare.plus(new Decimal(activity.cost));
                            break;
                        case "Sport":
                            totalSport = totalSport.plus(new Decimal(activity.cost));
                            break;
                    }
                }
            }
        
    
        const data = {
            totalAccomodation,
            totalTransport,
            totalShoppingEntertainment,
            totalCulinary,
            totalSightSeeing,
            totalHealthcare,
            totalSport,
        };
    
        return data;
    }

    static async setBudget(req: CreateBudgetRequest, itinerary_id: number): Promise<String>{
        const accommodationBudget = await prismaClient.budget.create({
            data:{
                itinerary_id: itinerary_id,
                type: "Accommodation",
                actual_budget: 0.0,
                estimated_budget: req.totalAccommodation

            }
        })
        const transportBudget = await prismaClient.budget.create({
            data:{
                itinerary_id: itinerary_id,
                type: "Transport",
                actual_budget: 0.0,
                estimated_budget: req.totalTransport

            }
        })
        const shoppingEntertainmentBudget = await prismaClient.budget.create({
            data:{
                itinerary_id: itinerary_id,
                type: "Shopping/Entertainment",
                actual_budget: 0.0,
                estimated_budget: req.totalTransport

            }
        })
        const sightSeeingBudget = await prismaClient.budget.create({
            data:{
                itinerary_id: itinerary_id,
                type: "Sightseeing",
                actual_budget: 0.0,
                estimated_budget: req.totalSightSeeing
            }
        })
        const foodBudget = await prismaClient.budget.create({
            data:{
                itinerary_id: itinerary_id,
                type: "Food",
                actual_budget: 0.0,
                estimated_budget: req.totalSightSeeing
            }
        })
        const healthcareBudget = await prismaClient.budget.create({
            data:{
                itinerary_id: itinerary_id,
                type: "Healthcare",
                actual_budget: 0.0,
                estimated_budget: req.totalSightSeeing
            }
        })
        const sportBudget = await prismaClient.budget.create({
            data:{
                itinerary_id: itinerary_id,
                type: "Sport",
                actual_budget: 0.0,
                estimated_budget: req.totalSightSeeing
            }
        })
        return "Data Created"
    }

    static async updateBudget(req: CreateBudgetRequest, itinerary_id: number){
        const allBudget = await prismaClient.budget.findMany({
            where:{
                itinerary_id: itinerary_id
            }
        })

        for(const budget of allBudget){
            switch(budget.type){
                case "Transport":
                    const accommodationBudget = await prismaClient.budget.update({
                        where:{
                            id: budget.id
                        },
                        data:{
                            itinerary_id: itinerary_id,
                            type: "Accommodation",
                            actual_budget: 0.0,
                            estimated_budget: req.totalAccommodation
            
                        }
                    })
                    break;
                case "Shopping/Entertainment":
                    const shoppingEntertainmentBudget = await prismaClient.budget.update({
                        where:{
                            id: budget.id
                        },
                        data:{
                            itinerary_id: itinerary_id,
                            type: "Shopping/Entertainment",
                            actual_budget: 0.0,
                            estimated_budget: req.totalShoppingEntertainment
            
                        }
                    })
                    
                    break;
                case "Sightseeing":
                    const sightSeeingBudget = await prismaClient.budget.update({
                        where:{
                            id: budget.id
                        },
                        data:{
                            itinerary_id: itinerary_id,
                            type: "Sightseeing",
                            actual_budget: 0.0,
                            estimated_budget: req.totalSightSeeing
            
                        }
                    })
                    
                    break;
                case "Food":
                    const foodBudget = await prismaClient.budget.update({
                        where:{
                            id: budget.id
                        },
                        data:{
                            itinerary_id: itinerary_id,
                            type: "Food",
                            actual_budget: 0.0,
                            estimated_budget: req.totalCulinary
            
                        }
                    })
                    
                    break;
                case "Healthcare":
                    const healthcareBudget = await prismaClient.budget.update({
                        where:{
                            id: budget.id
                        },
                        data:{
                            itinerary_id: itinerary_id,
                            type: "Healthcare",
                            actual_budget: 0.0,
                            estimated_budget: req.totalHealthcare
            
                        }
                    })
                    
                    break;
                case "Sport":
                    const sportBudget = await prismaClient.budget.update({
                        where:{
                            id: budget.id
                        },
                        data:{
                            itinerary_id: itinerary_id,
                            type: "Sport",
                            actual_budget: 0.0,
                            estimated_budget: req.totalSport
            
                        }
                    })
                    
                    break;
            }
        }
    }
}