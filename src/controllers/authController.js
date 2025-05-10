import User from '../models/user.js';
import jwt from 'jsonwebtoken';



// Controller de connexion des utilisateurs
export const loginUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).json({ message: 'User not found' });
    }

    console.log("User Data:", req.user); // Vérifie que `role` est présent

    const token = jwt.sign(
      { id: req.user.id, mail: req.user.mail, role: req.user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log("Generated Token:", token); // Vérifie que le `role` est présent dans le token

    res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: req.user.id, mail: req.user.mail, role: req.user.role }
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



// Controller pour l'enregistrement des utilisateurs
export const registerUser = async (req, res) => {
  const { first_name, last_name, mail, password, birth_date, address } = req.body;

  if (!first_name || !last_name || !mail || !password || !birth_date || !address) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await User.findOne({ where: { mail } });
    if (existingUser) {
      return res.status(400).json({ message: `This email address is already in use` });
    }

    const newUser = await User.create({
      first_name,
      last_name,
      mail,
      password, // Le mot de passe est maintenant haché
      birth_date: new Date(birth_date),
      address,
    });

    res.status(201).json({
      message: 'User successfully registered',
      user: {
        id: newUser._id,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        mail: newUser.mail,
        birth_date: newUser.birth_date,
        address: newUser.address,
        role: 'user'
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }

};


export const logoutUser = async (req, res) => {
  res.status(200).json({  message: "Logout successful" });
};


// Fonction pour mettre à jour le profil d'un utilisateur

export const updateProfile = async (req, res) => {
    const userId = req.params.id;  
    const { first_name, last_name, address, birth_date } = req.body;  

    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.first_name = first_name || user.first_name;
        user.last_name = last_name || user.last_name;
        user.address = address || user.address;
        user.birth_date = birth_date ? new Date(birth_date) : user.birth_date;

        await user.save();

        return res.status(200).json({
            message: "Profil updated successfully.",
            user: {
                id: user.id,
                mail: user.mail,
                first_name: user.first_name,
                last_name: user.last_name,
                address: user.address,
                birth_date: user.birth_date,
            },
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        return res.status(500).json({ error: "Server error updating profile" });
    }
};