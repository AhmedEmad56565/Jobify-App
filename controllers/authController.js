import User from '../models/userModel.js';
import AppError from '../utils/appError.js';
import { StatusCodes } from 'http-status-codes';
import { generateToken, getResponse } from '../utils/generateToken.js';

// @desc    register a user
// @route   POST /api/v1/users/register
// @access  public
export const register = async (req, res, next) => {
  const { name, lastName, email, password, location, role } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    return next(new AppError('User already exists!', StatusCodes.BAD_REQUEST));
  }

  const userData = { name, lastName, email, password, location, role };
  const newUser = await User.create(userData);
  if (!newUser) {
    return next(
      new AppError('Error registering user!', StatusCodes.BAD_REQUEST)
    );
  }

  getResponse(res, newUser, StatusCodes.CREATED);
};

// @desc    login a user
// @route   POST /api/v1/users/login
// @access  public
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.validatePassword(password))) {
    return next(
      new AppError('Invalid email or password!', StatusCodes.UNAUTHORIZED)
    );
  }

  generateToken(res, user._id);
  getResponse(res, user);
};

// @desc    logout a user
// @route   POST /api/v1/users/logout
// @access  public
export const logout = async (req, res, next) => {
  res.clearCookie('jwt');
  res.status(StatusCodes.OK).json({ message: 'Logged out successfully.' });
};
