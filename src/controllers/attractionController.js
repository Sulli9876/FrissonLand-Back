import Attraction from '../models/attraction.js';
import Category from '../models/category.js';
import HTTPError from '../errors/httpError.js';

const attractionController = {
  async getAllAttractions(req, res) {
    const attractions = await Attraction.findAll({
      attributes: ['id', 'name', 'description', 'image', 'duration', 'category_id']
    });
    res.json({ attractions });
  },

  async getOneAttractionById(req, res) {
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
  },

  async getAttractionsByCategory(req, res) {
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
  },

  async createAttraction(req, res) {
    const { name, description, image, duration, category_id } = req.body;
    const attraction = await Attraction.create({ name, description, image, duration, category_id });
    res.json(attraction);
  },

  async deleteAttraction(req, res) {
    const { id } = req.params;
    await Attraction.destroy({ where: { id } });
    res.json({ success: true, message: 'Attraction deleted successfully' });
  },

  async updateAttraction(req, res) {
    const { id } = req.params;
    const { name, description, image, duration, category_id } = req.body;

    const [updated] = await Attraction.update(
      { name, description, image, duration, category_id },
      { where: { id } }
    );

    if (!updated) {
      throw new HTTPError(404, 'Attraction not found');
    }

    const updatedAttraction = await Attraction.findByPk(id);
    res.json(updatedAttraction);
  },
};

export default attractionController;
