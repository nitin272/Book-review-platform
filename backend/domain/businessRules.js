

export function canUserEditBook(book, userId) {
  if (!book || !userId) {
    return false;
  }
  
  const bookOwnerId = book.addedBy?._id || book.addedBy;
  return bookOwnerId.toString() === userId.toString();
}

export function canUserEditReview(review, userId) {
  if (!review || !userId) {
    return false;
  }
  
  const reviewOwnerId = review.userId?._id || review.userId;
  return reviewOwnerId.toString() === userId.toString();
}

export function hasUserReviewedBook(existingReview) {
  return existingReview !== null && existingReview !== undefined;
}

export function isValidObjectId(id) {
  if (!id || typeof id !== 'string') {
    return false;
  }

  const objectIdRegex = /^[0-9a-fA-F]{24}$/;
  return objectIdRegex.test(id);
}

export function createPaginationInfo(page, limit, total) {
  const currentPage = parseInt(page) || 1;
  const itemsPerPage = parseInt(limit) || 5;
  const totalItems = parseInt(total) || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  return {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1,
    nextPage: currentPage < totalPages ? currentPage + 1 : null,
    prevPage: currentPage > 1 ? currentPage - 1 : null
  };
}

export function sanitizeSearchFilters(filters) {
  const cleanFilters = {};
  
  if (filters.genre && typeof filters.genre === 'string') {
    cleanFilters.genre = filters.genre.trim();
  }
  
  if (filters.author && typeof filters.author === 'string') {
    cleanFilters.author = filters.author.trim();
  }
  
  if (filters.title && typeof filters.title === 'string') {
    cleanFilters.title = filters.title.trim();
  }
  
  return cleanFilters;
}