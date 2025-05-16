import {Router} from 'express'; 
import attractionController from "../controllers/attractionController.js";
import categoryController from "../controllers/categoryController.js";
import ticketController from '../controllers/ticketController.js';
import controllerWrapper from "../middlewares/controllerWrapper.js";
import reviewController from '../controllers/reviewController.js';
import contactController from '../controllers/contactController.js';



const router = Router();

//route d'affichage des attractions
router.get('/attractions', controllerWrapper(attractionController.getAllAttractions));
router.get('/attraction/:id', controllerWrapper (attractionController.getOneAttractionById));
router.get('/categories/:categoryId', controllerWrapper (attractionController.getAttractionsByCategory));
router.get('/categories', controllerWrapper (categoryController.getAllCategories));
router.get('/tickets', controllerWrapper(ticketController.getAllTickets));
router.get('/review/:id',controllerWrapper(reviewController.getReviewsByAttractionId));
router.post('/contact', controllerWrapper(contactController.sendEmail));
export default router;
