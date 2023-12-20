import User from '../models/userModel.js';
import Job from '../models/jobModel.js';
import AppError from '../utils/appError.js';
import { StatusCodes } from 'http-status-codes';
import { getResponse } from '../utils/generateToken.js';

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
export const updateUser = async (req, res, next) => {
  const { name, email, lastName, location } = req.body;
  const user = await User.findById(req.user._id);

  if (user) {
    const userData = { name, email, lastName, location };
    const updatedUser = await User.findByIdAndUpdate(req.user._id, userData, {
      new: true,
      runValidators: true,
    });
    getResponse(res, updatedUser);
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
