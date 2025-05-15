import  Review from "../models/review.js";
import User from "../models/user.js";
import Attraction from "../models/attraction.js";
import HTTPError from "../errors/httpError.js";

const reviewController = {
    async createReview(req, res) {
        const { note, commentaire  , attractionId} = req.body;
        const userId = req.user.id;
        const existingReview = await Review.findOne({ where: { userId, attractionId } });
        if (existingReview) {
            throw new HTTPError(400, 'Review already exists for this attraction by the same user');
        }
        const user = await User.findByPk(userId);
        if (!user) {
            throw new HTTPError(404, 'User not found');
        }

        const attraction = await Attraction.findByPk(attractionId);
        if (!attraction) {
            throw new HTTPError(404, 'Attraction not found');
        }

        const review = await Review.create({ note, commentaire, userId, attractionId });

          // Ajoute les infos de l'utilisateur à l'objet review retourné
          review.dataValues.user = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name
          };

          res.json(review);
    },

    async getReviewsByAttractionId(req, res) {
        try {
            const reviews = await Review.findAll({
              where: { attraction_id: req.params.id },
              include: [
                {
                  model: User,
                  as : 'user',
                  attributes: ['id', 'first_name', 'last_name'],
                },
                {
                  model: Attraction,
                  as: 'attraction', 
                  attributes: ['id', 'name', 'description'],
                },
              ],
              order: [['createdAt', 'DESC']],
            });
        
            // Vérification de la date avant d'appeler toISOString
            const formattedReviews = reviews.map((review) => {
              const reviewDate = review.createdAt;
              const formattedDate = reviewDate ? reviewDate.toISOString() : 'Date non disponible';
              
              return {
                ...review.dataValues,
                createdAt: formattedDate,
                
              };
            });
        
            res.status(200).json({ reviews: formattedReviews });
          } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erreur lors de la récupération des avis' });
          }
        },
    
    
        
    async getUserReviews (req, res) {
      const userId = parseInt(req.params.id);
      if (!userId) return res.status(400).json({ error: 'ID utilisateur manquant' });
      const reviews = await Review.findAll({
        where: { user_id: userId },
        include: [
          {
            model: Attraction,
            as: 'attraction', // ⬅️ AJOUT OBLIGATOIRE de l'alias défini dans les associations
            attributes: ['name']
          }
        ]
      });
  
      res.json(reviews)
    },

    async deleteReview (req, res) {
        const { id } = req.params;
        const review = await Review.findByPk(id);
        if (!review) {
            throw new HTTPError(404, 'Review not found');
        }
        await review.destroy();
        res.json({ success: true, message: 'Review deleted successfully' });
    },

    async updateReview (req, res) {
        const { id } = req.params;
        const { note, commentaire } = req.body;
        const review = await Review.findByPk(id);
        if (!review) {
            throw new HTTPError(404, 'Review not found');
        }
        review.note = note;
        review.commentaire = commentaire;
        await review.save();
        res.json(review);
    }
};

export default reviewController;