import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import HTTPError from '../errors/httpError.js';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import { OAuth2Client } from 'google-auth-library';
import { Op } from 'sequelize';
import crypto from 'crypto';

// Connexion de l'utilisateur
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// Fonction pour envoyer email reset password
async function sendResetPasswordEmail(toEmail, resetLink, userName) {
  const mailOptions = {
    from: `"FrissonLand Support" <${process.env.MAIL_USER}>`,
    to: toEmail,
    subject: 'Réinitialisation de votre mot de passe',
    html: `
      <p>Bonjour ${userName},</p>
      <p>Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le lien ci-dessous pour définir un nouveau mot de passe :</p>
      <a href="${resetLink}">Réinitialiser mon mot de passe</a>
      <p>Si vous n'avez pas demandé cette réinitialisation, ignorez ce mail.</p>
      <br />
      <p>Cordialement,<br />L'équipe FrissonLand</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}

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
      id: newUser.id,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      mail: newUser.mail,
    
      role: 'user',
    },
  });
},
async loginGoogleUser(req, res) {
  const {token} =req.body;
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  if (!token) return res.status(400).json({ message: 'Token manquant' });
  try {
    // Vérifie le token Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    // Extraire les infos
    const { email, given_name, family_name, picture } = payload;

    // Vérifie si l'utilisateur existe déjà
    let user = await User.findOne({ where: { mail: email } });

    // Sinon, crée-le
    if (!user) {
      user = await User.create({
        first_name: given_name,
        last_name: family_name,
        mail : email,
        password: null, // ou "google-auth" si tu veux marquer l'origine
        role: 'user'
      });
    }

    // Crée ton propre JWT pour la session
    const tokenJWT = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    console.log('Token JWT:', tokenJWT);
    res.json({ token: tokenJWT, user });
  } catch (error) {
    console.error('Erreur Google login:', error);
    res.status(401).json({ message: 'Authentification Google échouée' });
  }
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

async forgotPassword(req, res) {
  const { mail } = req.body;

  try {
    const user = await User.findOne({ where: { mail } });

    if (user) {
      const token = crypto.randomBytes(32).toString('hex');
      const expiry = Date.now() + 3600000; // 1h

      user.resetToken = token;
      user.resetTokenExpiry = expiry;
      await user.save();

      const resetLink = `http://localhost:5173/reset-password/${token}`;

      await sendResetPasswordEmail(user.mail, resetLink, user.first_name || 'utilisateur');
    }

    // Toujours renvoyer ce message pour ne pas révéler si mail existe ou non
    res.json({ message: 'Si un compte existe, un email a été envoyé.' });
  } catch (err) {
    console.error('Erreur forgotPassword:', err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
},

async resetPassword(req, res) {
  const { token, newPassword } = req.body;

  try {
    const user = await User.findOne({
      where: {
        resetToken: token,
        resetTokenExpiry: { [Op.gt]: Date.now() },
      },
    });

    if (!user) {
      return res.status(400).json({ message: 'Lien invalide ou expiré.' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();

    res.json({ message: 'Mot de passe réinitialisé avec succès.' });
  } catch (err) {
    console.error('Erreur resetPassword:', err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
},

};

export default authController