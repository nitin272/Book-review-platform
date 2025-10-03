import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail, findUserById, updateUser } from "../repositories/userRepository.js";
import { ValidationError, ConflictError, AuthenticationError, NotFoundError } from "../http/middlewares/errors/AppError.js";
import { sanitizeUserData, createUserResponse } from "../domain/userValidation.js";

export const registerUserService = async (userData) => {
  // Use domain validation
  const sanitizedData = sanitizeUserData(userData);

  const existingUser = await findUserByEmail(sanitizedData.email);
  if (existingUser) {
    throw new ConflictError("User with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(sanitizedData.password, 10);
  const newUser = await createUser({
    name: sanitizedData.name,
    email: sanitizedData.email,
    password: hashedPassword,
  });

  return createUserResponse(newUser);
};

export const loginUserService = async (loginData) => {
  const { email, password } = loginData;

  const user = await findUserByEmail(email.toLowerCase());
  if (!user) {
    throw new AuthenticationError("Invalid email or password");
  }

  // Check password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new AuthenticationError("Invalid email or password");
  }

  // Generate JWT token
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );

  // Return user data and token
  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    token
  };
};

export const getUserProfileService = async (userId) => {
  const user = await findUserById(userId);
  if (!user) {
    throw new NotFoundError("User not found");
  }

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

export const updateUserProfileService = async (userId, updateData) => {
  const { name, email, currentPassword, newPassword } = updateData;

  // Find user
  const user = await findUserById(userId);
  if (!user) {
    throw new NotFoundError("User not found");
  }

  const updates = {};

  if (name) {
    updates.name = name.trim();
  }
  if (email) {
    const emailLower = email.toLowerCase();
    if (emailLower !== user.email) {
      const existingUser = await findUserByEmail(emailLower);
      if (existingUser) {
        throw new ConflictError("Email already in use");
      }
      updates.email = emailLower;
    }
  }

  // Update password if provided
  if (newPassword) {
    if (!currentPassword) {
      throw new ValidationError("Current password is required to change password");
    }

    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      throw new AuthenticationError("Current password is incorrect");
    }

    updates.password = await bcrypt.hash(newPassword, 10);
  }

  // Update user
  const updatedUser = await updateUser(userId, updates);

  return {
    id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    updatedAt: updatedUser.updatedAt,
  };
};