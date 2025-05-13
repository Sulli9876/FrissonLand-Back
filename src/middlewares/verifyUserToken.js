import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
        return res.status(403).json({ message: 'Veuillez vous connecter' });
    }

    const token = authHeader.split(' ')[1];  // Récupérer le token après "Bearer"

    if (!token) {
        return res.status(403).json({ message: 'Token manquant' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        // Vérification si l'utilisateur tente d'accéder à ses propres données (par exemple, son profil)
        if (req.user.id !== parseInt(req.params.id, 10)) {
            return res.status(403).json({ message: 'Vous n\'avez pas la permission d\'accéder à ce profil' });
        }

        next();
    } catch (error) {
        console.error('Erreur de vérification du token:', error.message);
        return res.status(401).json({ message: 'Token invalide ou expiré. Veuillez vous reconnecter.' });
    }
};

export default verifyToken;
