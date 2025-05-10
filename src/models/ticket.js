import { Model, DataTypes } from "sequelize";
import {sequelize} from './sequelize.js';

export class Ticket extends Model {}

Ticket.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: true,
  },
  value: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, // Génère automatiquement la date au format TIMESTAMPTZ
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  }
}, {
  sequelize,
  tableName: "ticket",
  timestamps: true,
  createdAt: 'created_at',  // Spécifie le nom de la colonne pour createdAt
  updatedAt: 'updated_at',  // Spécifie le nom de la colonne pour updatedAt
});

export default Ticket