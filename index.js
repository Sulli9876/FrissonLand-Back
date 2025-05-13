import express from 'express';
import "dotenv/config";
import { sequelize } from "./src/models/sequelize.js";
import router from './src/router/router.js';
import authRouter from './src/router/authRouter.js';
import adminRouter from './src/router/adminRouter.js';
import errorHandler from './src/errors/errorHandler.js';
import cors from 'cors';



const app = express();
const port = process.env.PORT || 4000;

// Middleware pour parser le JSON dans les requêtes
app.use(express.json());
app.use(cors());
// Servir les fichiers statiques depuis le dossier "public"
app.use(express.static('public'));
app.use("/", router);
app.use("/auth", authRouter);
app.use("/admin", adminRouter);


app.use(errorHandler);
(async () => {
    try {
      await sequelize.authenticate();
      console.log("📚 Sequelize connected");
  
      await sequelize.sync({ alter: true }); 
      console.log("🔄 Database synchronized");
  
      app.listen(port, () => {
        console.log(`🚀 Server ready: http://localhost:${port}`);
      });
    } catch (error) {
      console.error("❌ Sequelize can't connect to database");
      console.error(error)
    }
  
  })();
