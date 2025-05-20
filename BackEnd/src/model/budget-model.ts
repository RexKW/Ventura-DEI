import { Budget } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export interface CreateBudgetRequest {
  totalAccommodation: Decimal;
  totalTransport: Decimal;
  totalShoppingEntertainment: Decimal;
  totalCulinary: Decimal;
  totalSightSeeing: Decimal;
  totalHealthcare: Decimal;
  totalSport: Decimal;
}

export interface BudgetResponse {
  id: number;
  estimated_budget: Decimal;
  actual_budget: Decimal;
  type: string;
}

export interface ActualBudgetResponse{
  totalAccomodation: Decimal;
  totalTransport: Decimal;
  totalShoppingEntertainment: Decimal;
  totalCulinary: Decimal;
  totalSightSeeing: Decimal;
  totalHealthcare: Decimal;
  totalSport: Decimal;
        
}

export function toBudgetResponse(budget: Budget): BudgetResponse {
  return {
    id: budget.id,
    estimated_budget: budget.estimated_budget,
    actual_budget: budget.actual_budget,
    type: budget.type,
  };
}


export function toBudgetResponseList(prismaTodo: Budget[]): BudgetResponse[] {
  const result = prismaTodo.map((budget) => {
    return {
      id: budget.id,
      estimated_budget: budget.estimated_budget,
      actual_budget: budget.actual_budget,
      type: budget.type,
    };
  })

  return result
}
