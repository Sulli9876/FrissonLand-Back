import  Review from "../models/review.js";
import User from "../models/user.js";
import Attraction from "../models/attraction.js";
import HTTPError from "../errors/httpError.js";

const reviewController = {
    async createReview(req, res) {
        const { note, commentaire } = req.body;
        const { userId, attractionId } = req.params;
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
        const { userId } = req.params;
        const reviews = await Review.findAll({ where: { userId } });
        res.json(reviews);
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