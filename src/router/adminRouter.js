import { Router } from "express";
import verifyAdminToken   from "../middlewares/verifyAdminToken.js";
import controllerWrapper from "../middlewares/controllerWrapper.js";
import attractionController from "../controllers/attractionController.js";
import categoryController from "../controllers/categoryController.js";
import ticketController from "../controllers/ticketController.js";
import userController from "../controllers/userController.js";
import reservationController from "../controllers/reservationController.js";





const adminRouter = Router();

adminRouter.get('/attractions', verifyAdminToken, controllerWrapper(attractionController.getAllAttractions));
adminRouter.get('/attractions/:id', verifyAdminToken, controllerWrapper(attractionController.getOneAttractionById));
adminRouter.post('/attractions', verifyAdminToken, controllerWrapper(attractionController.createAttraction));
adminRouter.put('/attractions/:id', verifyAdminToken, controllerWrapper(attractionController.updateAttraction));
adminRouter.delete('/attractions/:id', verifyAdminToken, controllerWrapper(attractionController.deleteAttraction));

adminRouter.get('/categories', verifyAdminToken, controllerWrapper(categoryController.getAllCategories));
adminRouter.get('/categories/:id', verifyAdminToken, controllerWrapper(categoryController.getOneCategoryById));
adminRouter.post('/categories', verifyAdminToken, controllerWrapper(categoryController.createCategory));
adminRouter.put('/categories/:id', verifyAdminToken, controllerWrapper(categoryController.updateCategory));
adminRouter.delete('/categories/:id', verifyAdminToken, controllerWrapper(categoryController.deleteCategory));

adminRouter.get('/tickets', verifyAdminToken, controllerWrapper(ticketController.getAllTickets));
adminRouter.get('/tickets/:id', verifyAdminToken, controllerWrapper(ticketController.getOneTicketById));
adminRouter.post('/tickets', verifyAdminToken, controllerWrapper(ticketController.createTicket));
adminRouter.put('/tickets/:id', verifyAdminToken, controllerWrapper(ticketController.updateTicket));
adminRouter.delete('/tickets/:id', verifyAdminToken, controllerWrapper(ticketController.deleteTicket));

adminRouter.get('/users', verifyAdminToken, controllerWrapper(userController.getAllUsers));
adminRouter.get('/users/:id', verifyAdminToken, controllerWrapper(userController.getOneUser));
adminRouter.put('/users/:id', verifyAdminToken, controllerWrapper(userController.updateUser));
adminRouter.delete('/users/:id', verifyAdminToken, controllerWrapper(userController.deleteUser));

adminRouter.get('/reservations', verifyAdminToken, controllerWrapper(reservationController.getAllBook));
adminRouter.get('/reservations/:id', verifyAdminToken, controllerWrapper(reservationController.getBookById));
adminRouter.post('/reservations', verifyAdminToken, controllerWrapper(reservationController.reserveTickets));
adminRouter.put('/reservations/:id', verifyAdminToken, controllerWrapper(reservationController.updateBook));
adminRouter.delete('/reservations/:id', verifyAdminToken, controllerWrapper(reservationController.deleteBook));

export default adminRouter;