import User from '../models/user.js';
import bcrypt from 'bcrypt';

const validateLogin = async (req, res, next) => {
  const { mail, password } = req.body;
  try {
    const user = await User.findOne({ where: { mail } });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mot de passe incorrect' });
    }
    req.user = user; 
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export default validateLogin;