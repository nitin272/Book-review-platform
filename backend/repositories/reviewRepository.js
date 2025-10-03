import { Review } from '../infrasturcture/schema.js';

export const createReview = async (reviewData) => {
  const newReview = new Review(reviewData);
  await newReview.save();
  return newReview;
};

export const findReviewsByBook = async (bookId) => {
  return await Review.find({ bookId })
    .populate('userId', 'name email')
    .sort({ createdAt: -1 });
};

export const findReviewById = async (id) => {
  return await Review.findById(id).populate('userId', 'name email');
};

export const findReviewByUserAndBook = async (userId, bookId) => {
  return await Review.findOne({ userId, bookId });
};

export const updateReview = async (id, updateData) => {
  return await Review.findByIdAndUpdate(id, updateData, { 
    new: true, 
    runValidators: true 
  }).populate('userId', 'name email');
};

export const deleteReview = async (id) => {
  return await Review.findByIdAndDelete(id);
};

export const findReviewsByUser = async (userId) => {
  return await Review.find({ userId })
    .populate('bookId', 'title author')
    .sort({ createdAt: -1 });
};

export const getBookReviewStats = async (bookId) => {
  const stats = await Review.aggregate([
    { $match: { bookId: bookId } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: '$rating' },
        totalReviews: { $sum: 1 },
        ratingDistribution: {
          $push: '$rating'
        }
      }
    }
  ]);

  if (stats.length === 0) {
    return {
      averageRating: 0,
      totalReviews: 0,
      ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    };
  }

  const result = stats[0];
  const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  
  result.ratingDistribution.forEach(rating => {
    distribution[rating] = (distribution[rating] || 0) + 1;
  });

  return {
    averageRating: Math.round(result.averageRating * 10) / 10,
    totalReviews: result.totalReviews,
    ratingDistribution: distribution
  };
};