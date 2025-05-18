import express from 'express';
import "dotenv/config";
import { sequelize } from "./src/models/sequelize.js";
import router from './src/router/router.js';
import authRouter from './src/router/authRouter.js';
import adminRouter from './src/router/adminRouter.js';
import errorHandler from './src/errors/errorHandler.js';
import path from 'path';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Routes API 
app.use("/", router);
app.use("/auth", authRouter);
app.use("/admin", adminRouter);

// Servir les fichiers statiques du front build
app.use(express.static(path.join(process.cwd(), 'dist')));

// toutes les routes non API -> index.html (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
});

app.use(errorHandler);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("📚 Sequelize connected");

    await sequelize.sync({ alter: true });
    console.log("🔄 Database synchronized");

    app.listen(port, () => {
      console.log(`🚀 Server ready on port ${port}`);
    });
  } catch (error) {
    console.error("❌ Sequelize can't connect to database");
    console.error(error);
  }
})();

