import Category from '../models/category.js';
import HTTPError from '../errors/httpError.js';

const categoryController = {
  // Récupérer toutes les catégories
  async getAllCategories(req, res) {
    const categories = await Category.findAll({
      attributes: ['id' , 'name'],
    });
    res.json({ categories });
  },

  // Récupérer une catégorie par ID
  async getOneCategoryById(req, res) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      throw new HTTPError(400, 'Invalid category ID');
    }

    const oneCategory = await Category.findOne({
      where: { id },
      attributes: ['name'],
    });

    if (!oneCategory) {
      throw new HTTPError(404, 'Category not found');
    }

    res.json({ oneCategory });
  },

  // Créer une nouvelle catégorie
  async createCategory(req, res) {
    const { name } = req.body;
    const category = await Category.create({ name });
    res.status(201).json(category);
  },

  // Supprimer une catégorie
  async deleteCategory(req, res) {
    const { id } = req.params;
    const deleted = await Category.destroy({ where: { id } });

    if (!deleted) {
      throw new HTTPError(404, 'Category not found');
    }

    res.json({ success: true, message: 'Category deleted successfully' });
  },

  // Mettre à jour une catégorie
  async updateCategory(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    const [updated] = await Category.update({ name }, { where: { id } });

    if (updated) {
      const updatedCategory = await Category.findByPk(id);
      res.json(updatedCategory);
    } else {
      throw new HTTPError(404, 'Category not found');
    }
  },
};

export default categoryController;
