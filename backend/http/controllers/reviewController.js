import {
    createReviewService,
    getBookReviewsService,
    updateReviewService,
    deleteReviewService,
    getUserReviewsService,
    getReviewByIdService
} from '../../services/reviewService.js';

export const createReviewController = async (req, res) => {
    try {
        const review = await createReviewService(req.body, req.user.id);

        res.status(201).json({
            success: true,
            message: "Review created successfully",
            data: review,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "Review creation failed",
        });
    }
};

export const getBookReviewsController = async (req, res) => {
    try {
        const result = await getBookReviewsService(req.params.bookId);

        res.status(200).json({
            success: true,
            message: "Reviews retrieved successfully",
            data: result,
        });
    } catch (error) {
        const statusCode = error.message.includes('not found') ? 404 : 400;

        res.status(statusCode).json({
            success: false,
            message: error.message || "Failed to retrieve reviews",
        });
    }
};

export const getReviewByIdController = async (req, res) => {
    try {
        const review = await getReviewByIdService(req.params.id);

        res.status(200).json({
            success: true,
            message: "Review retrieved successfully",
            data: review,
        });
    } catch (error) {
        const statusCode = error.message.includes('not found') ? 404 : 400;

        res.status(statusCode).json({
            success: false,
            message: error.message || "Review not found",
        });
    }
};

export const updateReviewController = async (req, res) => {
    try {
        const review = await updateReviewService(req.params.id, req.body, req.user.id);

        res.status(200).json({
            success: true,
            message: "Review updated successfully",
            data: review,
        });
    } catch (error) {
        const statusCode = error.message.includes('not found') ? 404 :
            error.message.includes('only edit') ? 403 : 400;

        res.status(statusCode).json({
            success: false,
            message: error.message || "Review update failed",
        });
    }
};

export const deleteReviewController = async (req, res) => {
    try {
        const result = await deleteReviewService(req.params.id, req.user.id);

        res.status(200).json({
            success: true,
            message: result.message,
        });
    } catch (error) {
        const statusCode = error.message.includes('not found') ? 404 :
            error.message.includes('only delete') ? 403 : 400;

        res.status(statusCode).json({
            success: false,
            message: error.message || "Review deletion failed",
        });
    }
};

export const getUserReviewsController = async (req, res) => {
    try {
        const reviews = await getUserReviewsService(req.user.id);

        res.status(200).json({
            success: true,
            message: "User reviews retrieved successfully",
            data: reviews,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to retrieve user reviews",
        });
    }
};