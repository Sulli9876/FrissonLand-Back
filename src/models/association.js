import {sequelize} from './sequelize.js';
import { Category } from "./category.js";
import { Attraction } from "./attraction.js";
import { Ticket } from "./ticket.js";
import { User } from "./user.js";
import { Book } from "./book.js";
import { Review } from "./review.js";

// Relations entre User et Ticket via Book
  // Book appartient à un Ticket via ticket_id
    Book.belongsTo(Ticket, 
      { foreignKey: 'ticket_id', as: 'ticket' });

// Book appartient à un User via user_id
    Book.belongsTo(User, 
      { foreignKey: 'user_id', as: 'user' });

// Relation entre Category et Attraction
    Category.hasMany(Attraction, {
      as: "attractions",
      foreignKey: 'category_id'  
    });

    Attraction.belongsTo(Category, {
      as: "category",
      foreignKey: 'category_id'
    }); 

    // Relation entre Review et User
    Review.belongsTo(User, {
      as: "user",
      foreignKey: 'user_id'
    });

    //Relation entre Review et Attraction
    Review.belongsTo(Attraction, {
      as: "attraction",
      foreignKey: 'attraction_id'
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