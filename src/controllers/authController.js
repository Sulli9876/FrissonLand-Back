import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import HTTPError from '../errors/httpError.js';
// Connexion de l'utilisateur

const authController = {
 async loginUser  (req, res)  {
  if (!req.user) {
    throw new HTTPError(400, 'User not found');
  }

  const token = jwt.sign(
    { id: req.user.id, mail: req.user.mail, role: req.user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.status(200).json({
    message: 'Login successful',
    token,
    user: { id: req.user.id, mail: req.user.mail, role: req.user.role },
  });
},

// Enregistrement d'un nouvel utilisateur
 async registerUser(req, res) {
  const { first_name, last_name, mail, password } = req.body;

  if (!first_name || !last_name || !mail || !password ) {
    throw new HTTPError(400, 'All fields are required');
  }

  const existingUser = await User.findOne({ where: { mail } });
  if (existingUser) {
    throw new HTTPError(400, 'This email address is already in use');
  }

  const newUser = await User.create({
    first_name,
    last_name,
    mail,
    password, // suppose que c’est déjà haché via middleware
    
  });

  res.status(201).json({
    message: 'User successfully registered',
    user: {
      id: newUser._id,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      mail: newUser.mail,
    
      role: 'user',
    },
  });
},

// Déconnexion
 async logoutUser (req, res) {
  res.status(200).json({ message: 'Logout successful' });
},

// Mise à jour du profil
 async updateProfile (req, res){
  const userId = req.params.id;
  const { first_name, last_name,  } = req.body;

  const user = await User.findByPk(userId);
  if (!user) {
    throw new HTTPError(404, 'User not found');
  }

  user.first_name = first_name || user.first_name;
  user.last_name = last_name || user.last_name;
 

  await user.save();

  res.status(200).json({
    message: 'Profile updated successfully',
    user: {
      id: user.id,
      mail: user.mail,
      first_name: user.first_name,
      last_name: user.last_name,
      
    },
  });
},

};

export default authController