import express from 'express';
import {
  createReviewController,
  getBookReviewsController,
  getReviewByIdController,
  updateReviewController,
  deleteReviewController,
  getUserReviewsController
} from '../controllers/reviewController.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();


router.get('/book/:bookId', getBookReviewsController);
router.get('/:id', getReviewByIdController); 


router.post('/', authenticate, createReviewController);
router.put('/:id', authenticate, updateReviewController); 
router.delete('/:id', authenticate, deleteReviewController);

router.get('/user/my-reviews', authenticate, getUserReviewsController);

export default router;