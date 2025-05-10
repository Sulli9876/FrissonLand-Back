import User from '../models/user.js';
import { HTTPError } from '../errors/httpError.js';

const userController = {
  async getOneUser(req, res) {
    const { id } = req.params; // Extraire l'ID de req.params

    if (!id) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new HTTPError(404, 'User not found');
      }

      res.status(200).json(user);
    } catch (error) {
      if (error instanceof HTTPError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
      }
    }
  },
  async getAllUsers(req, res) {
    try {
        const users = await User.findAll(); 
        res.render('users', {users});  
    } catch (error) {
        console.error('Error load users:', error);
        res.status(500).json({ error: 'Failed to load users' });
    }
},

async deleteUser(req, res) {
    try {
        const { id } = req.params;
        const user = await User.destroy({ where: { id } });
        res.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting User:', error);
        res.status(500).json({ error: 'Failed to delete User' });
    }
},
async updateUser(req, res) {
    try {
        const { id } = req.params;
        const { first_name, last_name, birth_date, address } = req.body; // On récupère les champs modifiables

        const [updated] = await User.update(
            { first_name, last_name, birth_date, address }, // Les champs à mettre à jour
            { where: { id } }
        );

        if (updated) {
            const updatedUser = await User.findByPk(id);
            res.json(updatedUser);
        } else {
            res.status(404).json({ error:'User not found'});
        }
    } catch (error) {
        console.error('Error updating User:', error);
        res.status(500).json({ error: 'Failed to update user' });
    }},

 async getUserTickets(req, res)  {
    try {
        const { id } = req.params;

        // Trouver l'utilisateur par son ID
        const user = await User.findByPk(id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Utiliser user.getTickets() pour récupérer les tickets associés via Book
        const tickets = await user.getTickets();

        res.status(200).json({ user, tickets });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tickets', error: error.message });
    }
},
};

export default userController;