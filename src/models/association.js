import {sequelize} from './sequelize.js';
import { Category } from "./category.js";
import { Attraction } from "./attraction.js";
import { Ticket } from "./ticket.js";
import { User } from "./user.js";
import { Book } from "./book.js";
import { Review } from "./review.js";

// Category <-> Attraction
Category.hasMany(Attraction, {
  as: "attractions",
  foreignKey: 'category_id',
  onDelete: 'RESTRICT',  // pas de cascade
});
Attraction.belongsTo(Category, {
  as: "category",
  foreignKey: 'category_id',
  onDelete: 'RESTRICT',
});

// Review <-> User et Attraction (cascade)
Review.belongsTo(User, {
  as: "user",
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});
Review.belongsTo(Attraction, {
  as: "attraction",
  foreignKey: 'attraction_id',
  onDelete: 'CASCADE',
});

// Book <-> User et Ticket (cascade)
Book.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
  onDelete: 'CASCADE',
});
Book.belongsTo(Ticket, {
  foreignKey: 'ticket_id',
  as: 'ticket',
  onDelete: 'CASCADE',
});


  export {
    sequelize,
    User,
    Ticket,
    Book,
    Attraction,
    Category,
    Review
  };