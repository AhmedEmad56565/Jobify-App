import Job from '../models/jobModel.js';
import AppError from '../utils/appError.js';
import { StatusCodes } from 'http-status-codes';

export const idError = async (req, res, next) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    return next(
      new AppError(`No Job was found with id.`, StatusCodes.NOT_FOUND)
    );
  }
  next();
};
