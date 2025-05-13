import bcrypt from 'bcrypt';

const hashPassword = async (req, res, next) => {
  try {
    const { password } = req.body;

    if (typeof password !== 'string') {
      return res.status(400).json({ message: 'Le mot de passe doit être une chaîne de caractères' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    req.body.password = hashedPassword; 

    next();
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors du hachage du mot de passe', error: error.message });
  }
};

export default hashPassword;