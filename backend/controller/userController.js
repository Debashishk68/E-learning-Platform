const userModel = require("../models/userModel");
const path = require("path");

const editProfile = async (req, res) => {
  try {
    const userId = req.id.user;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { name } = req.body;
    const updateFields = {};

    if (name) updateFields.name = name;

    if (req.file) {
      const profilePicPath = `/uploads/profile_pics/${req.file.filename}`;
      updateFields.profilePic = profilePicPath;
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          name: updateFields.name,
          profilepic: updateFields.profilePic,
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (req.file) {
      return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        user: updatedUser,
        profilepic: `/uploads/profile_pics/${req.file.filename}`,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Edit Profile Error:", err.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const deletedUser = await userModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "User account deleted successfully",
    });
  } catch (error) {
    console.error("Delete User Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { editProfile, deleteUser };
