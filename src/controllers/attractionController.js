import Attraction from '../models/attraction.js';
import Category from '../models/category.js';
import { HTTPError } from "../errors/httpError.js";

const attractionController = {
    async getAllAttractions(req, res, next) {
        try {
            const attractions = await Attraction.findAll({
                attributes: ['id', 'name', 'description', 'image', 'duration', 'category_id']
            });
            res.json({ attractions });
        } catch (error) {
            next(new HTTPError(500, 'Error fetching attractions'));
        }
    },
    async getOneAttaractionById(req, res, next) {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                throw new HTTPError(400, 'Invalid attraction ID');
            }
            const oneAttraction = await Attraction.findOne({
                where: { id },
                attributes: ['id', 'name', 'description', 'image', 'duration', 'category_id']
            });
            if (!oneAttraction) {
                throw new HTTPError(404, 'Attraction not found');
            }
            res.json({ oneAttraction });
        } catch (error) {
            next(error);
        }
    },
    async getAttractionsByCategory(req, res, next) {
        try {
            const categoryId = parseInt(req.params.categoryId, 10);
            if (isNaN(categoryId)) {
                throw new HTTPError(400, 'Invalid category ID');
            }
            const attractions = await Attraction.findAll({
                where: { category_id: categoryId },
                attributes: ['id', 'name', 'description', 'image', 'duration'],
                include: [{
                    model: Category,
                    as: 'category',
                    attributes: ['name']
                }]
            });
            res.json({ attractions });
        } catch (error) {
            next(error);
        }
    },
    async createAttraction(req, res) {
        try {
            const { name, description, image, duration, category_id } = req.body;
            const attraction = await Attraction.create({ name, description, image, duration, category_id });
            res.json(attraction);
        } catch (error) {
            console.error('Error creating attraction:', error);
            res.status(500).json({ error: 'Failed to create attraction' });
        }
    },
    async deleteAttraction(req, res) {
        try {
            const { id } = req.params;
            const attraction = await Attraction.destroy({ where: { id } });
            res.json({ success: true, message: 'Attraction deleted successfully' });
        } catch (error) {
            console.error('Error deleting attraction:', error);
            res.status(500).json({ error: 'Failed to delete attraction' });
        }
    },
   
    async updateAttraction(req, res) {
        try {
            const { id } = req.params;
            const { name, description, image, duration, category_id } = req.body;
            const [updated] = await Attraction.update({ name, description, image, duration, category_id }, { where: { id } });
            if (updated) {
                const updatedAttraction = await Attraction.findByPk(id);
                res.json(updatedAttraction);
            } else {
                res.status(404).json({ error: 'Attraction not found' });
            }
        } catch (error) {
            console.error('Error updating attraction:', error);
            res.status(500).json({ error: 'Failed to update attraction' });
        }
    },
};

export default attractionController;