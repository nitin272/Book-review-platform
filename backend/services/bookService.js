import { 
  createBook, 
  findAllBooks, 
  findBookById, 
  updateBook, 
  deleteBook, 
  findBooksByUser 
} from '../repositories/bookRepository.js';

export const createBookService = async (bookData, userId) => {
  const { title, author, description, genre, publishedYear } = bookData;

  // Validation
  if (!title || title.trim().length < 1) {
    throw new Error('Title is required');
  }
  if (!author || author.trim().length < 1) {
    throw new Error('Author is required');
  }
  if (!description || description.trim().length < 10) {
    throw new Error('Description must be at least 10 characters long');
  }
  if (!genre || genre.trim().length < 1) {
    throw new Error('Genre is required');
  }

  const currentYear = new Date().getFullYear();
  const numYear = parseInt(publishedYear);
  if (!publishedYear || isNaN(numYear) || numYear < 1000 || numYear > currentYear) {
    throw new Error(`Published year must be between 1000 and ${currentYear}`);
  }

  const newBook = await createBook({
    title: title.trim(),
    author: author.trim(),
    description: description.trim(),
    genre: genre.trim(),
    publishedYear: numYear,
    addedBy: userId,
  });

  return {
    id: newBook._id,
    title: newBook.title,
    author: newBook.author,
    description: newBook.description,
    genre: newBook.genre,
    publishedYear: newBook.publishedYear,
    averageRating: newBook.averageRating,
    reviewCount: newBook.reviewCount,
    createdAt: newBook.createdAt,
  };
};

export const getAllBooksService = async (page = 1, limit = 5, filters = {}) => {
  const result = await findAllBooks(page, limit, filters);
  
  return {
    books: result.books.map(book => ({
      id: book._id,
      title: book.title,
      author: book.author,
      description: book.description,
      genre: book.genre,
      publishedYear: book.publishedYear,
      averageRating: book.averageRating,
      reviewCount: book.reviewCount,
      addedBy: book.addedBy,
      createdAt: book.createdAt,
    })),
    pagination: result.pagination
  };
};

export const getBookByIdService = async (bookId) => {
  const book = await findBookById(bookId);
  if (!book) {
    throw new Error('Book not found');
  }

  return {
    id: book._id,
    title: book.title,
    author: book.author,
    description: book.description,
    genre: book.genre,
    publishedYear: book.publishedYear,
    averageRating: book.averageRating,
    reviewCount: book.reviewCount,
    addedBy: book.addedBy,
    createdAt: book.createdAt,
    updatedAt: book.updatedAt,
  };
};

export const updateBookService = async (bookId, updateData, userId) => {
  const book = await findBookById(bookId);
  if (!book) {
    throw new Error('Book not found');
  }

  // Check if user is the owner
  if (book.addedBy._id.toString() !== userId) {
    throw new Error('You can only edit books you added');
  }

  const { title, author, description, genre, publishedYear } = updateData;
  const updates = {};

  // Validate and update fields
  if (title) {
    if (title.trim().length < 1) {
      throw new Error('Title is required');
    }
    updates.title = title.trim();
  }

  if (author) {
    if (author.trim().length < 1) {
      throw new Error('Author is required');
    }
    updates.author = author.trim();
  }

  if (description) {
    if (description.trim().length < 10) {
      throw new Error('Description must be at least 10 characters long');
    }
    updates.description = description.trim();
  }

  if (genre) {
    if (genre.trim().length < 1) {
      throw new Error('Genre is required');
    }
    updates.genre = genre.trim();
  }

  if (publishedYear) {
    const currentYear = new Date().getFullYear();
    const numYear = parseInt(publishedYear);
    if (isNaN(numYear) || numYear < 1000 || numYear > currentYear) {
      throw new Error(`Published year must be between 1000 and ${currentYear}`);
    }
    updates.publishedYear = numYear;
  }

  const updatedBook = await updateBook(bookId, updates);

  return {
    id: updatedBook._id,
    title: updatedBook.title,
    author: updatedBook.author,
    description: updatedBook.description,
    genre: updatedBook.genre,
    publishedYear: updatedBook.publishedYear,
    averageRating: updatedBook.averageRating,
    reviewCount: updatedBook.reviewCount,
    updatedAt: updatedBook.updatedAt,
  };
};

export const deleteBookService = async (bookId, userId) => {
  const book = await findBookById(bookId);
  if (!book) {
    throw new Error('Book not found');
  }

  // Check if user is the owner
  if (book.addedBy._id.toString() !== userId) {
    throw new Error('You can only delete books you added');
  }

  await deleteBook(bookId);
  return { message: 'Book deleted successfully' };
};

export const getUserBooksService = async (userId) => {
  const books = await findBooksByUser(userId);
  
  return books.map(book => ({
    id: book._id,
    title: book.title,
    author: book.author,
    genre: book.genre,
    publishedYear: book.publishedYear,
    averageRating: book.averageRating,
    reviewCount: book.reviewCount,
    createdAt: book.createdAt,
  }));
};