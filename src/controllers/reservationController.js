import { User, Book, Ticket } from '../models/association.js'; 
import { sequelize } from '../models/sequelize.js';

function generateTimestampBasedId(userId) {
    const timestamp = Date.now();
    const randomComponent = Math.floor(Math.random() * 10000);
    const formattedTimestamp = timestamp.toString().substring(0, 6);
    return `${userId}-${formattedTimestamp}-${randomComponent}`;
}

const reservationController = {
    async allBook(req, res) {
        try {
            const books = await Book.findAll({
                attributes: ['id', 'reservation_number', 'visit_date', 'quantity', 'ticket_id', 'user_id', 'created_at', 'updated_at'],
                include: [{
                    model: Ticket,
                    attributes: ['name', 'value']
                }]
            });
            res.render('book', { books }); // 'book' est le nom de la vue (ex: book.ejs)
        } catch (error) {
            console.error('Error loading books:', error);
            res.status(500).json({ error: 'Failed to load books' });
        }
    },

    async getUserBook(req, res) {
        try {
            const { id } = req.user;

            const reservations = await Book.findAll({
                where: { user_id: id },
                include: [{
                    model: Ticket,
                    attributes: ['name', 'value']
                }]
            });

            if (!reservations || reservations.length === 0) {
                return res.status(404).json({ message: 'No reservations found for this user' });
            }

            res.status(200).json({ reservations });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching reservations', error: error.message });
        }
    },

    async getBookById(req, res) {
        try {
            const { id } = req.params;
            const book = await Book.findByPk(id, {
                include: [{ model: Ticket }]
            });
            if (book) {
                res.json(book);
            } else {
                res.status(404).json({ error: 'Book not found' });
            }
        } catch (error) {
            console.error('Error fetching book:', error);
            res.status(500).json({ error: 'Failed to fetch book' });
        }
    },

    async deleteBook(req, res) {
        try {
            const { reservationNumber } = req.params;

            const result = await Book.destroy({
                where: { reservation_number: reservationNumber }
            });

            if (result) {
                res.status(200).json({ message: 'Reservation deleted successfully' });
            } else {
                res.status(404).json({ message: 'Reservation not found' });
            }
        } catch (error) {
            console.error('Error deleting reservation:', error);
            res.status(500).json({ message: 'Server error' });
        }
    },

    async updateBook(req, res) {
        try {
            const { id } = req.params;
            const { quantity, visit_date } = req.body;

            const [updated] = await Book.update(
                { quantity, visit_date },
                { where: { id } }
            );

            if (updated) {
                const updatedBook = await Book.findByPk(id);
                res.json(updatedBook);
            } else {
                res.status(404).json({ error: 'Book not found' });
            }
        } catch (error) {
            console.error('Error updating book:', error);
            res.status(500).json({ error: 'Failed to update book' });
        }
    },

    async reserveTickets(req, res) {
        const userId = req.user.id;
        const { ticketCounts, visitDate } = req.body;

        try {
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
        } catch (error) {
            console.error('Error reserving tickets:', error);
            res.status(500).json({ message: 'An error occurred while reserving tickets' });
        }
    }
};

export default reservationController;
