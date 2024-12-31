const UserModel = require('../Models/user');

// Controller to get all users 
const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find().exec();

    res.status(200).json({
      users,
      totalUsers: users.length,
    });
  } catch (error) {
    console.error("Error fetching all users:", error.message);
    return res.status(500).json({ message: 'Server error. Failed to fetch users.' });
  }
};


// Controller to delete a user (Admin only)
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Only admins can delete users.' });
    }

    const user = await UserModel.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    return res.status(500).json({ message: 'Server error. Failed to delete user.' });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("req.params ", req.params)

    const user = await UserModel.findById(id);
    console.log("user ", user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

//  fetch current users
const getCurrentUser = async (req, res) => {
  try {
    return res.status(200).json({ user: req.user });
  } catch (error) {
    console.error("Error fetching current user:", error.message);
    return res.status(500).json({ message: 'Server error. Failed to fetch user.' });
  }
};

// Controller to update user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const allowedFields = [
    'firstName',
    'lastName',
    'practiceName',
    'phone',
    'streetAddress',
    'city',
    'state',
    'zip',
  ];

  const updateFields = Object.keys(updates).filter((field) =>
    allowedFields.includes(field)
  );

  if (updateFields.length === 0) {
    return res.status(400).json({ message: 'No valid fields to update.' });
  }

  try {
    if (req.user.role !== 'admin' && req.user._id.toString() !== id) {
      return res.status(403).json({
        message: 'Access denied. You can only update your own details unless you are an admin.',
      });
    }

    const updateData = {};
    updateFields.forEach((field) => {
      updateData[field] = updates[field];
    });

    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      // $set, only the fields specified in updateData will be changed
      // $set is a MongoDB update operator
      { $set: updateData },
      { new: true, runValidators: true } 
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      message: 'User updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating user:', error.message);
    return res.status(500).json({ message: 'Server error. Failed to update user.' });
  }
};


module.exports = { getAllUsers, deleteUser, getCurrentUser, updateUser, getUserById };
