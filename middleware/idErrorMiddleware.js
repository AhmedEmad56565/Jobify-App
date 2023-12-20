import Job from '../models/jobModel.js';
import User from '../models/userModel.js';
import AppError from '../utils/appError.js';
import { StatusCodes } from 'http-status-codes';

export const idJobError = async (req, res, next) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    return next(
      new AppError(`No Job was found with id.`, StatusCodes.NOT_FOUND)
    );
  }
  next();
};

export const idUserError = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new AppError(`No User was found with id.`, StatusCodes.NOT_FOUND)
    );
  }
  next();
};
