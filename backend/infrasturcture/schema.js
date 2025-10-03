
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        password: { type: String, required: true },
    },
    { timestamps: true }
);

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        unique: true
    },
    author: {
        type: String,
        required: [true, 'Author is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    genre: {
        type: String,
        required: [true, 'Genre is required'],
        trim: true
    },
    publishedYear: {
        type: Number,
        required: [true, 'Published year is required'],
        min: [1000, 'Year must be a valid 4-digit number'],
        max: [new Date().getFullYear(), 'Year cannot be in the future']
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    averageRating: {
        type: Number,
        default: 0
    },
    reviewCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const ReviewSchema = new mongoose.Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required'],
        min: [1, 'Rating must be at least 1 star'],
        max: [5, 'Rating cannot exceed 5 stars']
    },
    reviewText: {
        type: String,
        required: [true, 'Review text is required'],
        trim: true
    },
}, {
    timestamps: true
});

ReviewSchema.index({ bookId: 1, userId: 1 }, { unique: true });


export const User = mongoose.model('User', UserSchema);
export const Book = mongoose.model('Book', BookSchema);
export const Review = mongoose.model('Review', ReviewSchema);