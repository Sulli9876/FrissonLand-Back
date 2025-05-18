import { Sequelize } from 'sequelize';

// On récupère l'URL depuis les variables d'environnement
const databaseURL = process.env.DATABASE_URL;

export const sequelize = new Sequelize(databaseURL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Important pour Render
    },
  },
  define: {
    underscored: true,
  },
  logging: false, // tu peux mettre true si tu veux voir les logs SQL
});

export default sequelize;
