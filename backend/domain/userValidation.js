// Pure domain validation functions - no external dependencies

export function validateUserName(name) {
  if (!name || typeof name !== 'string') {
    throw new Error('Name is required and must be a string');
  }
  
  const trimmedName = name.trim();
  if (trimmedName.length < 2) {
    throw new Error('Name must be at least 2 characters long');
  }
  
  if (trimmedName.length > 50) {
    throw new Error('Name cannot exceed 50 characters');
  }
  
  return trimmedName;
}

export function validateUserEmail(email) {
  if (!email || typeof email !== 'string') {
    throw new Error('Email is required and must be a string');
  }
  
  const trimmedEmail = email.trim().toLowerCase();
  
  // Simple email regex without external dependencies
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    throw new Error('Please provide a valid email address');
  }
  
  if (trimmedEmail.length > 100) {
    throw new Error('Email cannot exceed 100 characters');
  }
  
  return trimmedEmail;
}

export function validateUserPassword(password) {
  if (!password || typeof password !== 'string') {
    throw new Error('Password is required and must be a string');
  }
  
  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters long');
  }
  
  if (password.length > 128) {
    throw new Error('Password cannot exceed 128 characters');
  }
  
  return password;
}

export function sanitizeUserData(userData) {
  const { name, email, password } = userData;
  
  return {
    name: validateUserName(name),
    email: validateUserEmail(email),
    password: validateUserPassword(password)
  };
}

export function createUserResponse(user) {
  return {
    id: user._id || user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
}