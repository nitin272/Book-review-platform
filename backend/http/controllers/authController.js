import { 
  registerUserService, 
  loginUserService, 
  getUserProfileService, 
  updateUserProfileService 
} from '../../services/userService.js';

export const registerUserController = async (req, res) => {
  try {
    const user = await registerUserService(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "User registration failed",
    });
  }
};

export const loginUserController = async (req, res) => {
  try {
    const result = await loginUserService(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message || "Login failed",
    });
  }
};

export const getUserProfileController = async (req, res) => {
  try {
    const user = await getUserProfileService(req.user.id);

    res.status(200).json({
      success: true,
      message: "Profile retrieved successfully",
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message || "Profile not found",
    });
  }
};

export const updateUserProfileController = async (req, res) => {
  try {
    const updatedUser = await updateUserProfileService(req.user.id, req.body);

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Profile update failed",
    });
  }
};
