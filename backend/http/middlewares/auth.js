import jwt from 'jsonwebtoken';
import { findUserById } from '../../repositories/userRepository.js';
import { AuthenticationError } from './errors/AppError.js';
import { asyncHandler } from './errors/asyncHandler.js';

export const authenticate = asyncHandler(async (req, res, next) => {
  // Get token from HTTP-only cookie
  const token = req.cookies.token;
  
  if (!token) {
    throw new AuthenticationError('Access denied. Please log in to continue.');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await findUserById(decoded.id);
    
    if (!user) {
      throw new AuthenticationError('User no longer exists. Please log in again.');
    }

    req.user = {
      id: user._id,
      name: user.name,
      email: user.email
    };
    
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      throw new AuthenticationError('Invalid token. Please log in again.');
    }
    if (error.name === 'TokenExpiredError') {
      throw new AuthenticationError('Your session has expired. Please log in again.');
    }
    throw error;
  }
});