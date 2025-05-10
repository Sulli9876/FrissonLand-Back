import { Model, DataTypes } from "sequelize";
import { sequelize } from './sequelize.js';
import { User } from "./user.js";
import { Ticket } from "./ticket.js";


export class Book extends Model {}

Book.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  
  reservation_number: {
    type: DataTypes.STRING,
    allowNull: false, // Ne pas définir de valeur par défaut ici
  },
    visit_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  ticketId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Ticket,
      key: "id",
    },
    field: 'ticket_id',  
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
}, {
  sequelize,
  tableName: "book",
  
});

export default Book;