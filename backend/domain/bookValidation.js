// Pure domain validation functions for books - no external dependencies

export function validateBookTitle(title) {
  if (!title || typeof title !== 'string') {
    throw new Error('Title is required and must be a string');
  }
  
  const trimmedTitle = title.trim();
  if (trimmedTitle.length < 1) {
    throw new Error('Title cannot be empty');
  }
  
  if (trimmedTitle.length > 200) {
    throw new Error('Title cannot exceed 200 characters');
  }
  
  return trimmedTitle;
}

export function validateBookAuthor(author) {
  if (!author || typeof author !== 'string') {
    throw new Error('Author is required and must be a string');
  }
  
  const trimmedAuthor = author.trim();
  if (trimmedAuthor.length < 1) {
    throw new Error('Author cannot be empty');
  }
  
  if (trimmedAuthor.length > 100) {
    throw new Error('Author name cannot exceed 100 characters');
  }
  
  return trimmedAuthor;
}

export function validateBookDescription(description) {
  if (!description || typeof description !== 'string') {
    throw new Error('Description is required and must be a string');
  }
  
  const trimmedDescription = description.trim();
  if (trimmedDescription.length < 10) {
    throw new Error('Description must be at least 10 characters long');
  }
  
  if (trimmedDescription.length > 2000) {
    throw new Error('Description cannot exceed 2000 characters');
  }
  
  return trimmedDescription;
}

export function validateBookGenre(genre) {
  if (!genre || typeof genre !== 'string') {
    throw new Error('Genre is required and must be a string');
  }
  
  const trimmedGenre = genre.trim();
  if (trimmedGenre.length < 1) {
    throw new Error('Genre cannot be empty');
  }
  
  if (trimmedGenre.length > 50) {
    throw new Error('Genre cannot exceed 50 characters');
  }
  
  return trimmedGenre;
}

export function validatePublishedYear(year) {
  const currentYear = new Date().getFullYear();
  const numYear = parseInt(year);
  
  if (!year || isNaN(numYear)) {
    throw new Error('Published year is required and must be a valid number');
  }
  
  if (numYear < 1000 || numYear > currentYear) {
    throw new Error(`Published year must be between 1000 and ${currentYear}`);
  }
  
  return numYear;
}

export function sanitizeBookData(bookData) {
  const { title, author, description, genre, publishedYear } = bookData;
  
  return {
    title: validateBookTitle(title),
    author: validateBookAuthor(author),
    description: validateBookDescription(description),
    genre: validateBookGenre(genre),
    publishedYear: validatePublishedYear(publishedYear)
  };
}

export function createBookResponse(book) {
  return {
    id: book._id || book.id,
    title: book.title,
    author: book.author,
    description: book.description,
    genre: book.genre,
    publishedYear: book.publishedYear,
    averageRating: book.averageRating || 0,
    reviewCount: book.reviewCount || 0,
    addedBy: book.addedBy,
    createdAt: book.createdAt,
    updatedAt: book.updatedAt
  };
}