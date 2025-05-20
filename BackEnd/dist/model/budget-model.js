"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toBudgetResponse = toBudgetResponse;
exports.toBudgetResponseList = toBudgetResponseList;
function toBudgetResponse(budget) {
    return {
        id: budget.id,
        estimated_budget: budget.estimated_budget,
        actual_budget: budget.actual_budget,
        type: budget.type,
    };
}
function toBudgetResponseList(prismaTodo) {
    const result = prismaTodo.map((budget) => {
        return {
            id: budget.id,
            estimated_budget: budget.estimated_budget,
            actual_budget: budget.actual_budget,
            type: budget.type,
        };
    });
    return result;
}
