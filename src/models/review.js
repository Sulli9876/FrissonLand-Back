import {Model , DataTypes} from "sequelize";
import { sequelize } from './sequelize.js';
import { User } from "./user.js";
import { Attraction } from "./attraction.js";

export class Review extends Model { }

Review.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    note: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5
        }
      },
    commentaire: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id",
        },
        field: 'user_id',
    },
    attractionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Attraction,
            key: "id",
        },
        field: 'attraction_id',
    },
}, {
    sequelize,
    tableName: "review",
    timestamps: true,
    indexes: [
        {
          unique: true,
          fields: ['user_id', 'attraction_id']
        }
      ]
})

export default Review 