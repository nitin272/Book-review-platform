import express from 'express';
import { 
  getUserProfileController, 
  updateUserProfileController 
} from '../controllers/authController.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();


router.use(authenticate);
router.get('/me', getUserProfileController);
router.put('/me', updateUserProfileController);

export default router;