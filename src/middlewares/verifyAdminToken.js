import jwt from 'jsonwebtoken';

const verifyAdminToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  console.log('Authorization Header reçu :', authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token manquant ou mal formé' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Accès réservé aux administrateurs' });
    }

    next();
  } catch (error) {
    console.error('Erreur de vérification du token:', error.message);
    return res.status(401).json({ message: 'Token invalide ou expiré' });
  }
};

export default verifyAdminToken;
