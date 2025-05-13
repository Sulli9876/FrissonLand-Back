import { User, Book, Ticket } from '../models/association.js'; 
import { sequelize } from '../models/sequelize.js';
import HTTPError from '../errors/httpError.js';
function generateTimestampBasedId(userId) {
    const timestamp = Date.now();
    const randomComponent = Math.floor(Math.random() * 10000);
    const formattedTimestamp = timestamp.toString().substring(0, 6);
    return `${userId}-${formattedTimestamp}-${randomComponent}`;
}

const reservationController = {
    async getAllBook(req, res) {
        const books = await Book.findAll({
            attributes: ['id', 'reservation_number', 'visit_date', 'quantity', 'ticket_id', 'user_id', 'created_at', 'updated_at'],
            include: [{
                model: Ticket,
                attributes: ['name', 'value']
            }]
        });
        res.json({ books });
    },

    async getUserBook(req, res) {
        const { id } = req.user;
        const reservations = await Book.findAll({
            where: { user_id: id },
            include: [{
                model: Ticket,
                attributes: ['name', 'value']
            }]
        });

        if (!reservations || reservations.length === 0) {
            throw new HTTPError(404, 'No reservations found for this user');
        }

        res.status(200).json({ reservations });
    },

    async getBookById(req, res) {
        const { id } = req.params;
        const book = await Book.findByPk(id, {
            include: [{ model: Ticket }]
        });

        if (!book) {
            throw new HTTPError(404, 'Book not found');
        }

        res.json(book);
    },

    async deleteBook(req, res) {
        const { reservationNumber } = req.params;
        const result = await Book.destroy({
            where: { reservation_number: reservationNumber }
        });

        if (!result) {
            throw new HTTPError(404, 'Reservation not found');
        }

        res.status(200).json({ message: 'Reservation deleted successfully' });
    },

    async updateBook(req, res) {
        const { id } = req.params;
        const { quantity, visit_date } = req.body;

        const [updated] = await Book.update(
            { quantity, visit_date },
            { where: { id } }
        );

        if (!updated) {
            throw new HTTPError(404, 'Book not found');
        }

        const updatedBook = await Book.findByPk(id);
        res.json(updatedBook);
    },

    async reserveTickets(req, res) {
        const userId = req.user.id;
        const { ticketCounts, visitDate } = req.body;

        const reservationNumber = generateTimestampBasedId(userId);

        for (const [ticketId, count] of Object.entries(ticketCounts)) {
            if (count > 0) {
                const ticket = await Ticket.findByPk(ticketId);
                if (!ticket) continue;

                await Book.create({
                    visit_date: visitDate,
                    quantity: count,
                    ticket_id: ticket.id,
                    user_id: userId,
                    reservation_number: reservationNumber,
                });
            }
        }

        res.status(201).json({ message: 'Reservation successful' });
    }
};

export default reservationController;
