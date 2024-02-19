const userModel = require("../models/userModel");
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const getUserById = async (id) => {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid Id");
  }

  const user = await userModel.findOne({ _id: id, isActive: true }, '-password');  // Excludes the password field from the result
  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

const getAllUsers = async () => {
  const users = await userModel.find({ isActive: true }, { password: 0 }); // Excluding password from the result
  return users;
};

const createUser = async (req) => {
  const { name, email, password, contact, address, preferences } = req.body;

  // checkig for missing information
  if (!email || !password || !name) {
    throw new Error("missing information");
  } else {
    const hash = bcrypt.hashSync(password, 10); // hasing and salting our password

    // adding the new user
    try {
      const User = new userModel({
        name,
        email, // this is the equivalent of writing email: email
        password: hash,
        contact,
        address,
        preferences,
        needPasswordUpdate:true
      });

      const user = await User.save();
      return user;
    } catch (error) {
      throw new Error( error.message);
    }
  }
};

const updateUser = async (id, updates) => {
  const { name, contact, role, address, preferences } = updates;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid Id");
  }
  

  if (!id || !name) {
    throw new Error("missing information");
  } else {
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { $set: { name, contact, address, role, preferences } },
      { new: true, runValidators: true } // Returns the updated document and runs validators
    ).select('-password'); // Exclude password from the output

    if (!updatedUser) {
      throw new Error("User not found or update failed");
    }

    return updatedUser;
  }
};

const updateUserPassword = async (id, updates) => {
  const { oldPassword, newPassword } = updates;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid Id");
  }
  // Assuming function is called within a context where `res` is not available
  if (!id || !oldPassword || !newPassword) {
    throw new Error("Missing information");
  }
  
  // Find user by ID
  const user = await userModel.findById(id);
  if (!user) {
    throw new Error("User not found");
  }
  
  // Verify old password
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    throw new Error("Old password is incorrect");
  }
  
  // Hash new password
  const hash = await bcrypt.hash(newPassword, 10);
  
  // Update user with new password
  const updatedUser = await userModel.findByIdAndUpdate(
    id,
    { $set: { password: hash } },
    { new: true, runValidators: true }
  ).select('-password'); // Exclude password from the output for security
  
  if (!updatedUser) {
    throw new Error("Password update failed");
  }
  
  return updatedUser;
};

const deleteUser = async (id) => {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid Id");
  }
  // Find user by ID
  const user = await userModel.findById(id);
  if (!user) {
    throw new Error("User not found!");
  }

  const deletedUser = await userModel.findByIdAndDelete(id);

  if (!deletedUser) {
    throw new Error("Deletion failed!");
  }

  return deletedUser; // You may not need to return the deleted user, but it can be useful for confirmation.
};


module.exports = {
  getAllUsers,
  updateUser,
  getUserById,
  deleteUser,
  createUser,
  updateUserPassword,
};
