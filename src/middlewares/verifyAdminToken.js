import jwt from 'jsonwebtoken';

const verifyAdminToken = (req, res, next) => {
    const token = req.cookies.token; // Récupérer le token depuis les cookies
    console.log('Token reçu via cookies:', token);

    if (!token) {
        // Redirection vers la page de connexion si l'utilisateur n'est pas connecté
        return res.redirect('/admin/login');
    }

    try {
        // Décoder et vérifier le token JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Stocker les informations de l'utilisateur dans req.user

        // Vérification du rôle admin
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Accès réservé aux administrateurs' });
        }

        next(); // Passe à la prochaine étape si tout est valide
    } catch (error) {
        console.error('Erreur de vérification du token:', error.message);
        // Redirection vers la page de connexion en cas d'erreur de token (expiré ou invalide)
        return res.redirect('/admin/login');
    }
};

export default verifyAdminToken;