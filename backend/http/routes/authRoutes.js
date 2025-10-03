import express from 'express';
import { 
  registerUserController, 
  loginUserController, 
  getUserProfileController, 
  updateUserProfileController 
} from '../controllers/authController.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', registerUserController);
router.post('/login', loginUserController);

router.get('/profile', authenticate, getUserProfileController);
router.put('/profile', authenticate, updateUserProfileController);

export default router;