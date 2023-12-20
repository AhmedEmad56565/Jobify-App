import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import AppError from '../utils/appError.js';
import { StatusCodes } from 'http-status-codes';

export const protect = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const userFound = await User.findById(userId).select('-password');
    if (!userFound) {
      return next(
        new AppError('Not authorized, token failed!', StatusCodes.FORBIDDEN)
      );
    }
    req.user = userFound;
    next();
  } else {
    return next(
      new AppError('Not authorized, no token!', StatusCodes.FORBIDDEN)
    );
  }
};

export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    next(new AppError('Not authorized as admin!', StatusCodes.FORBIDDEN));
  }
};
