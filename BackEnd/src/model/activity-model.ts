import { Activity } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export interface CreateActivityRequest {
  name: string;
  description: string;
  start_time: Date;
  end_time: Date;
  type: string;
  cost: Decimal;
  day_id: number;
  location_name: string;
  location_address: string;
  location_link: string;
  location_name2?: string | null
  location_address2?: string | null;
  location_link2?:   string | null;
  method?: string | null;
}


export interface ActivityUpdateRequest {
  name: string;
  description: string;
  day_id: number;
  start_time: Date;
  end_time: Date;
  type: string;
  cost: Decimal;
  location_address: string;
  location_link: string;
}

export interface ActivityResponse {
  id: number;
  name: string;
  description: string;
  start_time: Date;
  end_time: Date;
  type: string;
  cost: Decimal;
  location_name: string;
  location_address: string;
  location_link: string;
  location_name2?: string | null
  location_address2?: string | null;
  location_link2?:   string | null;

}

export function toActivityResponse(activity: Activity): ActivityResponse {
  return {
    id: activity.id,
    name: activity.name,
    description: activity.description,
    start_time: activity.start_time,
    end_time: activity.end_time,
    type: activity.type,
    cost: activity.cost,
    location_name: activity.location_name,
    location_address: activity.location_address,
    location_link: activity.location_link,
    location_name2: activity.location_name2,
    location_address2: activity.location_address2,
    location_link2: activity.location_link2
  };
}

export function toActivityResponseList(prismaTodo: Activity[]): ActivityResponse[] {
  const result = prismaTodo.map((activity) => {
      return {
        id: activity.id,
        name: activity.name,
        description: activity.description,
        start_time: activity.start_time,
        end_time: activity.end_time,
        type: activity.type,
        cost: activity.cost,
        location_name: activity.location_name,
        location_address: activity.location_address,
        location_link: activity.location_link,
        location_name2: activity.location_name2,
        location_address2: activity.location_address2,
        location_link2: activity.location_link2
      }
  })

  return result
}
