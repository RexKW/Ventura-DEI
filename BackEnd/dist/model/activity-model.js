"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toActivityResponse = toActivityResponse;
exports.toActivityResponseList = toActivityResponseList;
function toActivityResponse(activity) {
    return {
        id: activity.id,
        name: activity.name,
        description: activity.description,
        start_time: activity.start_time,
        end_time: activity.end_time,
        type: activity.type,
        cost: activity.cost,
        method: activity.method,
        location_name: activity.location_name,
        location_address: activity.location_address,
        location_link: activity.location_link,
        location_name2: activity.location_name2,
        location_address2: activity.location_address2,
        location_link2: activity.location_link2
    };
}
function toActivityResponseList(prismaTodo) {
    const result = prismaTodo.map((activity) => {
        return {
            id: activity.id,
            name: activity.name,
            description: activity.description,
            start_time: activity.start_time,
            end_time: activity.end_time,
            type: activity.type,
            cost: activity.cost,
            method: activity.method,
            location_name: activity.location_name,
            location_address: activity.location_address,
            location_link: activity.location_link,
            location_name2: activity.location_name2,
            location_address2: activity.location_address2,
            location_link2: activity.location_link2
        };
    });
    return result;
}
