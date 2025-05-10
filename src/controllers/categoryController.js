import  Category  from '../models/category.js';
import { HTTPError } from "../errors/httpError.js";


// renvoie toutes les categories
const categoryController = {
    async getAllCategories(req, res, next) {
      try {
        const categories = await Category.findAll({
          attributes: ['name']
        });
        res.json({ categories });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        next(new HTTPError(500, 'Error fetching categories'));
      }
    },
    // renvoie une categorie
    async getOneCategoriesById(req, res, next) {
      try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
          throw new HTTPError(400, ' invalid category ID');
        }
        const oneCategory = await Category.findOne({
          where: { id },
          attributes: ['name']
        });
        if (!oneCategory) {
          throw new HTTPError(404, 'Categorie not found');
        }
        res.json({ oneCategory });
      } catch (error) {
        next(error instanceof HTTPError ? error : new HTTPError(500, 'Error fetching one categories'));
      }
    },
    async createCategory(req, res) {
        try {
            const { name } = req.body;
            const category = await Category.create({ name });
            res.json(category);
        } catch (error) {
            console.error('Error creating category:', error);
            res.status(500).json({ error: 'Failed to create category' });
        }
    },

    async deleteCategory(req, res) {
        try {
            const { id } = req.params;
            const category = await Category.destroy({ where: { id } });
            res.json({ success: true, message: 'Category deleted successfully' });
        } catch (error) {
            console.error('Error deleting category:', error);
            res.status(500).json({ error: 'Failed to delete category' });
        }
    },

    async updateCategory(req, res) {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const [updated] = await Category.update({ name }, { where: { id } });
            if (updated) {
                const updatedCategory = await Category.findByPk(id);
                res.json(updatedCategory);
            } else {
                res.status(404).json({ error: 'Category not found' });
            }
        } catch (error) {
            console.error('Error updating category:', error);
            res.status(500).json({ error: 'Failed to update category' });
        }
    },
    
  };
  
  export default categoryController;