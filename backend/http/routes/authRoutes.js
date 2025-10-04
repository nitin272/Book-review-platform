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

router.post('/register', registerUserController);
router.post('/login', loginUserController);


router.post('/logout', authenticate, logoutUserController);
router.get('/profile', authenticate, getUserProfileController);
router.get('/me', authenticate, getUserProfileController); 
router.put('/profile', authenticate, updateUserProfileController);

export default router;