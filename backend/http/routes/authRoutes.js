import express from 'express';
import { 
  registerUserController, 
  loginUserController, 
  getUserProfileController, 
  updateUserProfileController,
  logoutUserController
} from '../controllers/authController.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.post('/register', registerUserController);
router.post('/login', loginUserController);

// Protected routes (require authentication)
router.post('/logout', authenticate, logoutUserController);
router.get('/profile', authenticate, getUserProfileController);
router.put('/profile', authenticate, updateUserProfileController);

export default router;