import { User } from '../infrasturcture/schema.js';

export const createUser = async (userData) => {
  const newUser = new User(userData);
  await newUser.save();
  return newUser;
};

export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export const findUserById = async (id) => {
  return await User.findById(id);
};

export const updateUser = async (userId, updateData) => {
  return await User.findByIdAndUpdate(userId, updateData, { 
    new: true, 
    runValidators: true 
  });
};