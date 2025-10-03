// Pure domain validation functions for reviews - no external dependencies

export function validateReviewRating(rating) {
  if (rating === undefined || rating === null) {
    throw new Error('Rating is required');
  }
  
  const numRating = parseInt(rating);
  if (isNaN(numRating)) {
    throw new Error('Rating must be a valid number');
  }
  
  if (numRating < 1 || numRating > 5) {
    throw new Error('Rating must be between 1 and 5');
  }
  
  return numRating;
}

export function validateReviewText(reviewText) {
  if (!reviewText || typeof reviewText !== 'string') {
    throw new Error('Review text is required and must be a string');
  }
  
  const trimmedText = reviewText.trim();
  if (trimmedText.length < 10) {
    throw new Error('Review text must be at least 10 characters long');
  }
  
  if (trimmedText.length > 1000) {
    throw new Error('Review text cannot exceed 1000 characters');
  }
  
  return trimmedText;
}

export function sanitizeReviewData(reviewData) {
  const { rating, reviewText } = reviewData;
  
  return {
    rating: validateReviewRating(rating),
    reviewText: validateReviewText(reviewText)
  };
}

export function createReviewResponse(review) {
  return {
    id: review._id || review.id,
    rating: review.rating,
    reviewText: review.reviewText,
    bookId: review.bookId,
    userId: review.userId,
    createdAt: review.createdAt,
    updatedAt: review.updatedAt
  };
}

export function calculateAverageRating(ratings) {
  if (!Array.isArray(ratings) || ratings.length === 0) {
    return 0;
  }
  
  const sum = ratings.reduce((acc, rating) => acc + rating, 0);
  const average = sum / ratings.length;
  
  // Round to 1 decimal place
  return Math.round(average * 10) / 10;
}

export function createRatingDistribution(ratings) {
  const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  
  if (!Array.isArray(ratings)) {
    return distribution;
  }
  
  ratings.forEach(rating => {
    if (rating >= 1 && rating <= 5) {
      distribution[rating] = (distribution[rating] || 0) + 1;
    }
  });
  
  return distribution;
}