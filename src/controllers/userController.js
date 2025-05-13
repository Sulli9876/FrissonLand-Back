import User from '../models/user.js';
import HTTPError from '../errors/httpError.js';

const userController = {
    async getOneUser(req, res) {
        const { id } = req.params; // Extraire l'ID de req.params

        if (!id) {
            throw new HTTPError(400, 'User ID is required');
        }

        const user = await User.findByPk(id);
        if (!user) {
            throw new HTTPError(404, 'User not found');
        }

        res.status(200).json(user);
    },

    async getAllUsers(req, res) {
        const users = await User.findAll(); 
        res.json({ users });
    },

    async deleteUser(req, res) {
        const { id } = req.params;
        const result = await User.destroy({ where: { id } });

        if (!result) {
            throw new HTTPError(404, 'User not found');
        }

        res.json({ success: true, message: 'User deleted successfully' });
    },

    async updateUser(req, res) {
        const { id } = req.params;
        const { first_name, last_name, birth_date, address } = req.body; // On récupère les champs modifiables

        const [updated] = await User.update(
            { first_name, last_name, birth_date, address }, // Les champs à mettre à jour
            { where: { id } }
        );

        if (!updated) {
            throw new HTTPError(404, 'User not found');
        }

        const updatedUser = await User.findByPk(id);
        res.json(updatedUser);
    },

    async getUserTickets(req, res) {
        const { id } = req.params;

        // Trouver l'utilisateur par son ID
        const user = await User.findByPk(id);
        
        if (!user) {
            throw new HTTPError(404, 'User not found');
        }

        // Utiliser user.getTickets() pour récupérer les tickets associés via Book
        const tickets = await user.getTickets();

        res.status(200).json({ user, tickets });
    },
};

export default userController;
