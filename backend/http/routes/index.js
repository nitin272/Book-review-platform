import express from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import bookRoutes from './bookRoutes.js';
import reviewRoutes from './reviewRoutes.js';
import healthRoutes from './healthRoutes.js';

const router = express.Router();


router.use('/health', healthRoutes);

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/books', bookRoutes);
router.use('/reviews', reviewRoutes);

export default router;