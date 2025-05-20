import { Ticket } from "@prisma/client";

export interface CreateTicketRequest {
  itinenary_destination_id: number;
  ticket_image: string;
  type: string;
}

export interface TicketResponse {
  id: number;
  ticket_image: string;
  type: string;
}

export function toTicketResponse(ticket: Ticket): TicketResponse {
  return {
    id: ticket.id,
    ticket_image: ticket.ticket_image,
    type: ticket.type,
  };
}
