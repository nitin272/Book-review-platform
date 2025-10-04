import jwt from 'jsonwebtoken';
import { findUserById } from '../../repositories/userRepository.js';
import { AuthenticationError } from './errors/AppError.js';
import { asyncHandler } from './errors/asyncHandler.js';

export const authenticate = asyncHandler(async (req, res, next) => {
  let token = req.cookies.token;
  
  // Fallback: Check Authorization header if no cookie
  if (!token) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }
  }
  
  // Debug logging
  console.log('=== AUTH MIDDLEWARE DEBUG ===');
  console.log('Request URL:', req.url);
  console.log('All cookies:', req.cookies);
  console.log('Authorization header:', req.headers.authorization);
  console.log('Token found:', token ? 'YES' : 'NO');
  console.log('================================');
  
  if (!token) {
    throw new AuthenticationError('Access denied. Please log in to continue.');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    let user;
    
    if (decoded.id) {
      user = await findUserById(decoded.id);
    }
    
    if (!user && decoded.email) {
      const { findUserByEmail } = await import('../../repositories/userRepository.js');
      user = await findUserByEmail(decoded.email);
    }
    
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