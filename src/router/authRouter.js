import { Router } from 'express';
import hashPassword from '../middlewares/hashPassword.js';
import authController from '../controllers/authController.js';
import validateLogin from '../middlewares/validateLogin.js';
import userController from '../controllers/userController.js';
import reservationController from '../controllers/reservationController.js';
import verifyToken from '../middlewares/verifyUserToken.js';
import controllerWrapper from '../middlewares/controllerWrapper.js';
import reviewController from '../controllers/reviewController.js';





const authRouter = Router();
authRouter.post('/login', validateLogin , controllerWrapper(authController.loginUser));
authRouter.post('/loginGoogle', controllerWrapper(authController.loginGoogleUser));
authRouter.post('/register', hashPassword, controllerWrapper(authController.registerUser));
authRouter.post('/logout', verifyToken, controllerWrapper(authController.logoutUser));
authRouter.post('/reserve', verifyToken, controllerWrapper(reservationController.reserveTickets));

authRouter.post('/forgot-password', controllerWrapper(authController.forgotPassword));
authRouter.post('/reset-password', controllerWrapper(authController.resetPassword));

authRouter.put('/profile/:id',verifyToken,  controllerWrapper(authController.updateProfile));

authRouter.get('/profile/:id',verifyToken,  controllerWrapper(userController.getOneUser));
authRouter.get('/profile/:id/tickets', verifyToken, controllerWrapper(userController.getUserTickets));
authRouter.get('/profile/:id/reservations', verifyToken, controllerWrapper(reservationController.getUserBook));

authRouter.delete('/profile/:id/reservations/:reservationNumber',verifyToken,controllerWrapper(reservationController.deleteBook));

authRouter.get('/profile/:id/reviews', verifyToken, controllerWrapper(reviewController.getUserReviews));
authRouter.post('/review' , verifyToken, controllerWrapper(reviewController.createReview));
authRouter.put('/review/:id', verifyToken, controllerWrapper(reviewController.updateReview));
authRouter.delete('/review/:id', verifyToken, controllerWrapper(reviewController.deleteReview));
export default authRouter; 