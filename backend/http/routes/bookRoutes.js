import express from 'express';
import {
    createBookController,
    getAllBooksController,
    getBookByIdController,
    updateBookController,
    deleteBookController,
    getUserBooksController
} from '../controllers/bookController.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();


router.get('/', getAllBooksController);
router.get('/:id', getBookByIdController);

router.post('/', authenticate, createBookController);
router.put('/:id', authenticate, updateBookController);
router.delete('/:id', authenticate, deleteBookController);

// User's books
router.get('/user/my-books', authenticate, getUserBooksController);
export default router;