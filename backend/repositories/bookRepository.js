import { Book } from '../infrasturcture/schema.js';

export const createBook = async (bookData) => {
  const newBook = new Book(bookData);
  await newBook.save();
  return newBook;
};

export const findAllBooks = async (page = 1, limit = 5, filters = {}) => {
  const skip = (page - 1) * limit;
  const query = {};


  if (filters.genre) {
    query.genre = new RegExp(filters.genre, 'i');
  }
  if (filters.author) {
    query.author = new RegExp(filters.author, 'i');
  }
  if (filters.title) {
    query.title = new RegExp(filters.title, 'i');
  }

  const books = await Book.find(query)
    .populate('addedBy', 'name email')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Book.countDocuments(query);

  return {
    books,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalBooks: total,
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1
    }
  };
};

export const findBookById = async (id) => {
  return await Book.findById(id).populate('addedBy', 'name email');
};

export const updateBook = async (id, updateData) => {
  return await Book.findByIdAndUpdate(id, updateData, { 
    new: true, 
    runValidators: true 
  }).populate('addedBy', 'name email');
};

export const deleteBook = async (id) => {
  return await Book.findByIdAndDelete(id);
};

export const findBooksByUser = async (userId) => {
  return await Book.find({ addedBy: userId }).sort({ createdAt: -1 });
};

export const updateBookRating = async (bookId, averageRating, reviewCount) => {
  return await Book.findByIdAndUpdate(
    bookId,
    { averageRating, reviewCount },
    { new: true }
  );
};