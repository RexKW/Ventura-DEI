"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toTicketResponse = toTicketResponse;
function toTicketResponse(ticket) {
    return {
        id: ticket.id,
        ticket_image: ticket.ticket_image,
        type: ticket.type,
    };
}
