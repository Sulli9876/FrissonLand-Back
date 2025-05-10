//model pour les attractions
import { Category } from "./category.js";
import { Model, DataTypes } from "sequelize";
import {sequelize} from './sequelize.js';

export class Attraction extends Model {}

Attraction.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,  
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'category',
      key: 'id'
    }
  },
  duration: {
    type: DataTypes.TIME,
    allowNull: false,
  }
}, {
  sequelize,
  tableName: "attraction",
});


export default Attraction;