import {
  createReview,
  findReviewsByBook,
  findReviewById,
  findReviewByUserAndBook,
  updateReview,
  deleteReview,
  findReviewsByUser,
  getBookReviewStats
} from '../repositories/reviewRepository.js';
import { findBookById, updateBookRating } from '../repositories/bookRepository.js';
import mongoose from 'mongoose';

export const createReviewService = async (reviewData, userId) => {
  const { bookId, rating, reviewText } = reviewData;

  // Validation
  if (!bookId || !mongoose.Types.ObjectId.isValid(bookId)) {
    throw new Error('Valid book ID is required');
  }

  if (!rating || rating < 1 || rating > 5 || !Number.isInteger(rating)) {
    throw new Error('Rating must be an integer between 1 and 5');
  }

  if (!reviewText || reviewText.trim().length < 10) {
    throw new Error('Review text must be at least 10 characters long');
  }

  // Check if book exists
  const book = await findBookById(bookId);
  if (!book) {
    throw new Error('Book not found');
  }

  // Check if user already reviewed this book
  const existingReview = await findReviewByUserAndBook(userId, bookId);
  if (existingReview) {
    throw new Error('You have already reviewed this book');
  }

  // Create review
  const newReview = await createReview({
    bookId,
    userId,
    rating,
    reviewText: reviewText.trim(),
  });

  // Update book's average rating
  await updateBookAverageRating(bookId);

  return {
    id: newReview._id,
    bookId: newReview.bookId,
    rating: newReview.rating,
    reviewText: newReview.reviewText,
    createdAt: newReview.createdAt,
  };
};

export const getBookReviewsService = async (bookId) => {
  if (!bookId || !mongoose.Types.ObjectId.isValid(bookId)) {
    throw new Error('Valid book ID is required');
  }

  // Check if book exists
  const book = await findBookById(bookId);
  if (!book) {
    throw new Error('Book not found');
  }

  const reviews = await findReviewsByBook(bookId);
  const stats = await getBookReviewStats(new mongoose.Types.ObjectId(bookId));

  return {
    reviews: reviews.map(review => ({
      id: review._id,
      rating: review.rating,
      reviewText: review.reviewText,
      user: {
        id: review.userId._id,
        name: review.userId.name,
      },
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
    })),
    stats
  };
};

export const updateReviewService = async (reviewId, updateData, userId) => {
  const { rating, reviewText } = updateData;

  // Find review
  const review = await findReviewById(reviewId);
  if (!review) {
    throw new Error('Review not found');
  }

  // Check if user owns the review
  if (review.userId._id.toString() !== userId) {
    throw new Error('You can only edit your own reviews');
  }

  const updates = {};

  // Validate and update rating
  if (rating !== undefined) {
    if (rating < 1 || rating > 5 || !Number.isInteger(rating)) {
      throw new Error('Rating must be an integer between 1 and 5');
    }
    updates.rating = rating;
  }

  // Validate and update review text
  if (reviewText !== undefined) {
    if (reviewText.trim().length < 10) {
      throw new Error('Review text must be at least 10 characters long');
    }
    updates.reviewText = reviewText.trim();
  }

  const updatedReview = await updateReview(reviewId, updates);

  // Update book's average rating if rating changed
  if (rating !== undefined) {
    await updateBookAverageRating(review.bookId);
  }

  return {
    id: updatedReview._id,
    rating: updatedReview.rating,
    reviewText: updatedReview.reviewText,
    updatedAt: updatedReview.updatedAt,
  };
};

export const deleteReviewService = async (reviewId, userId) => {
  // Find review
  const review = await findReviewById(reviewId);
  if (!review) {
    throw new Error('Review not found');
  }

  // Check if user owns the review
  if (review.userId._id.toString() !== userId) {
    throw new Error('You can only delete your own reviews');
  }

  const bookId = review.bookId;
  await deleteReview(reviewId);

  // Update book's average rating
  await updateBookAverageRating(bookId);

  return { message: 'Review deleted successfully' };
};

export const getUserReviewsService = async (userId) => {
  const reviews = await findReviewsByUser(userId);

  return reviews.map(review => ({
    id: review._id,
    rating: review.rating,
    reviewText: review.reviewText,
    book: {
      id: review.bookId._id,
      title: review.bookId.title,
      author: review.bookId.author,
    },
    createdAt: review.createdAt,
    updatedAt: review.updatedAt,
  }));
};

export const getReviewByIdService = async (reviewId) => {
  if (!reviewId || !mongoose.Types.ObjectId.isValid(reviewId)) {
    throw new Error('Valid review ID is required');
  }

  const review = await findReviewById(reviewId);
  if (!review) {
    throw new Error('Review not found');
  }

  return {
    id: review._id,
    rating: review.rating,
    reviewText: review.reviewText,
    user: {
      id: review.userId._id,
      name: review.userId.name,
      email: review.userId.email,
    },
    bookId: review.bookId,
    createdAt: review.createdAt,
    updatedAt: review.updatedAt,
  };
};

// Helper function to update book's average rating
const updateBookAverageRating = async (bookId) => {
  const stats = await getBookReviewStats(new mongoose.Types.ObjectId(bookId));
  await updateBookRating(bookId, stats.averageRating, stats.totalReviews);
};