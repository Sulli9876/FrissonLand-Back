import HTTPError from '../errors/httpError.js';
// Le wrapper gère les erreurs pour chaque fonction de contrôleur
const controllerWrapper = (controllerFunction) => {
  return async (req, res, next) => {
    try {
      // Appel de la fonction du contrôleur
      await controllerFunction(req, res, next);
    } catch (error) {
      // Si c'est une instance de HTTPError, on renvoie un message spécifique
      if (error instanceof HTTPError) {
        return res.status(error.statusCode).json({
          message: error.message,
          error: error.details || null,
        });
      }
      
      // Pour toutes les autres erreurs, on renvoie une erreur serveur générique
      console.error('Server Error:', error); 
      return res.status(500).json({
        message: "Internal server error",
        error: error.message || 'An unexpected error occurred',
      });
    }
  };
};

export default controllerWrapper;