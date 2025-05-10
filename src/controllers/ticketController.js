import { User , Book , Ticket} from '../models/association.js'; 
import {sequelize} from '../models/sequelize.js';

const ticketController = {

    async getAllTickets(req, res) {
        try {
            const tickets = await Ticket.findAll({
                attributes: ['id', 'value', 'name', 'created_at']
            });
            res.render( {tickets})
            
        } catch (error) {
            console.error('Error load ticket:', error);
            res.status(500).json({ error: 'Failed to load ticket' });        }
    }, 
    // renvoie toutes les tickets
    async getOneTicketById(req, res) {
        try {
            const { id } = req.params;
            const ticket = await Ticket.findByPk(id);
            if (ticket) {
                res.json(ticket);
            } else {
                res.status(404).json({ error: 'Ticket not found' });
            }
        } catch (error) {
            console.error('Error fetching ticket:', error);
            res.status(500).json({ error: 'Failed to fetch ticket' });
        }
    },
    async createTicket(req, res) {
        try {
            const { name, value } = req.body;  // Assurez-vous que le 'value' est inclus dans la requête
            const ticket = await Ticket.create({ name, value });
            res.json(ticket);
        } catch (error) {
            console.error('Error creating ticket:', error);
            res.status(500).json({ error: 'Failed to create ticket' });
        }
    },
    
    async deleteTicket(req, res) {
        try {
            const { id } = req.params;
            const ticket = await Ticket.destroy({ where: { id } });
            if (ticket) {
                res.json({ success: true, message: 'Ticket deleted successfully' });
            } else {
                res.status(404).json({ error: 'Ticket not found' });
            }
        } catch (error) {
            console.error('Error deleting ticket:', error);
            res.status(500).json({ error: 'Failed to delete ticket' });
        }
    },
    
    async updateTicket(req, res) {
        try {
            const { id } = req.params;
            const { value, name } = req.body;  // Supprimé 'booking_date'
        
            const [updated] = await Ticket.update(
                { value, name }, 
                { where: { id } }
            );
        
            if (updated) {
                const updatedTicket = await Ticket.findByPk(id);
                res.json(updatedTicket);
            } else {
                res.status(404).json({ error: 'Ticket not found' });
            }
        } catch (error) {
            console.error('Error updating ticket:', error);
            res.status(500).json({ error: 'Failed to update ticket' });
        }
    },
   
    
      




};

export default ticketController