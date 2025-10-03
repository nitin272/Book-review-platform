import { 
  registerUserService, 
  loginUserService, 
  getUserProfileService, 
  updateUserProfileService 
} from '../../services/userService.js';
import { createTokenCookie, clearTokenCookie } from '../../utils/cookieUtils.js';
import { asyncHandler } from '../middlewares/errors/asyncHandler.js';

export const registerUserController = asyncHandler(async (req, res) => {
  const user = await registerUserService(req.body);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: user,
  });
});

export const loginUserController = asyncHandler(async (req, res) => {
  const result = await loginUserService(req.body);

  // Set HTTP-only cookie
  createTokenCookie(result.token, res);

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      user: result.user
    },
  });
});

export const getUserProfileController = asyncHandler(async (req, res) => {
  const user = await getUserProfileService(req.user.id);

  res.status(200).json({
    success: true,
    message: "Profile retrieved successfully",
    data: user,
  });
});

export const updateUserProfileController = asyncHandler(async (req, res) => {
  const updatedUser = await updateUserProfileService(req.user.id, req.body);

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: updatedUser,
  });
});
export const logoutUserController = asyncHandler(async (req, res) => {
  clearTokenCookie(res);

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});