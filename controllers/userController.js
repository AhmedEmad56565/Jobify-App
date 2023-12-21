import User from '../models/userModel.js';
import Job from '../models/jobModel.js';
import AppError from '../utils/appError.js';
import { StatusCodes } from 'http-status-codes';
import { getResponse } from '../utils/generateToken.js';
import cloudinary from 'cloudinary';
import { promises as fs } from 'fs';

// @desc    get current user
// @route   GET /api/v1/users/current-user
// @access  private
export const getCurrentUser = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return next(new AppError('unauthorized user!', StatusCodes.UNAUTHORIZED));
  }
  getResponse(res, user);
};

// @desc    update a user
// @route   PATCH /api/v1/users/update-user
// @access  private
// export const updateUser = async (req, res) => {
//   const newUser = { ...req.body };
//   delete newUser.password;

//   if (req.file) {
//     const response = await cloudinary.v2.uploader.upload(req.file.path);
//     await fs.unlink(req.file.path);
//     newUser.avatar = response.secure_url;
//     newUser.avatarPublicId = response.public_id;
//   }

//   const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);

//   if (req.file && updatedUser.avatarPublicId) {
//     await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
//   }

//   res.status(StatusCodes.OK).json({ msg: 'update user' });
// };
export const updateUser = async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const { name, email, lastName, location } = req.body;
    const userData = { name, email, lastName, location };

    if (req.file) {
      const response = await cloudinary.v2.uploader.upload(req.file.path);
      await fs.unlink(req.file.path);
      userData.avatar = response.secure_url;
      userData.avatarPublicId = response.public_id;
    }

    const updatedUser = await User.findByIdAndUpdate(req.user._id, userData, {
      runValidators: true,
    });

    if (req.file && updatedUser.avatarPublicId) {
      await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
    }

    res.status(StatusCodes.OK).json({ message: 'user updated successfully.' });
  } else {
    next(new AppError('unauthorized user!', StatusCodes.UNAUTHORIZED));
  }
};

// @desc    get app stats
// @route   GET /api/v1/users/admin/app-stats
// @access  private
export const getApplicationStats = async (req, res, next) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();

  res.status(StatusCodes.OK).json({ users, jobs });
};
