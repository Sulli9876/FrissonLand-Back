
import { Sequelize } from "sequelize";

const { PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE } = process.env;

const databaseURL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}`;

export  const sequelize = new Sequelize(databaseURL, {
  define: {
    underscored: true,
  },
});

export default sequelize