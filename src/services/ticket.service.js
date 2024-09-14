import TicketModel from '../dao/models/ticket.model.js';

class TicketService {
    async generateTicket(cart, userEmail) { 
        const total = cart.products.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

        const ticketData = {
            purchaser: userEmail, 
            amount: total, 
            purchase_datetime: new Date(), 
        };

        const ticket = await TicketModel.create(ticketData);
        return ticket;
    }

    async getTicketById(ticketId) {
        return await TicketModel.findById(ticketId);
    }
}

export default new TicketService;
