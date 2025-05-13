import { User, Book, Ticket } from '../models/association.js'; 
import { sequelize } from '../models/sequelize.js';
import HTTPError from '../errors/httpError.js';

const ticketController = {
    async getAllTickets(req, res) {
        const tickets = await Ticket.findAll({
            attributes: ['id', 'value', 'name', 'created_at']
        });
        res.json({ tickets });
    },

    async getOneTicketById(req, res) {
        const { id } = req.params;
        const ticket = await Ticket.findByPk(id);

        if (!ticket) {
            throw new HTTPError(404, 'Ticket not found');
        }

        res.json(ticket);
    },

    async createTicket(req, res) {
        const { name, value } = req.body;
        const ticket = await Ticket.create({ name, value });
        res.json(ticket);
    },

    async deleteTicket(req, res) {
        const { id } = req.params;
        const result = await Ticket.destroy({ where: { id } });

        if (!result) {
            throw new HTTPError(404, 'Ticket not found');
        }

        res.json({ success: true, message: 'Ticket deleted successfully' });
    },

    async updateTicket(req, res) {
        const { id } = req.params;
        const { value, name } = req.body;

        const [updated] = await Ticket.update({ value, name }, { where: { id } });

        if (!updated) {
            throw new HTTPError(404, 'Ticket not found');
        }

        const updatedTicket = await Ticket.findByPk(id);
        res.json(updatedTicket);
    },
};

export default ticketController;
