import {
  createBookService,
  getAllBooksService,
  getBookByIdService,
  updateBookService,
  deleteBookService,
  getUserBooksService
} from '../../services/bookService.js';

export const createBookController = async (req, res) => {
  try {
    const book = await createBookService(req.body, req.user.id);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Book creation failed",
    });
  }
};

export const getAllBooksController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const filters = {
      genre: req.query.genre,
      author: req.query.author,
      title: req.query.title,
    };

    const result = await getAllBooksService(page, limit, filters);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve books",
    });
  }
};

export const getBookByIdController = async (req, res) => {
  try {
    const book = await getBookByIdService(req.params.id);

    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message || "Book not found",
    });
  }
};

export const updateBookController = async (req, res) => {
  try {
    const book = await updateBookService(req.params.id, req.body, req.user.id);

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error) {
    const statusCode = error.message.includes('not found') ? 404 :
      error.message.includes('only edit') ? 403 : 400;

    res.status(statusCode).json({
      success: false,
      message: error.message || "Book update failed",
    });
  }
};

export const deleteBookController = async (req, res) => {
  try {
    const result = await deleteBookService(req.params.id, req.user.id);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    const statusCode = error.message.includes('not found') ? 404 :
      error.message.includes('only delete') ? 403 : 400;

    res.status(statusCode).json({
      success: false,
      message: error.message || "Book deletion failed",
    });
  }
};

export const getUserBooksController = async (req, res) => {
  try {
    const books = await getUserBooksService(req.user.id);

    res.status(200).json({
      success: true,
      message: "User books retrieved successfully",
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve user books",
    });
  }
};