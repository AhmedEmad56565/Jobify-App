import AppError from '../utils/appError.js';
import { StatusCodes } from 'http-status-codes';

export const notFound = (req, res, next) => {
  return next(
    new AppError(`Not Found - ${req.originalUrl}`, StatusCodes.NOT_FOUND)
  );
};

export const errHandler = (err, req, res, next) => {
  let statusCode = err.statusCode
    ? err.statusCode
    : StatusCodes.INTERNAL_SERVER_ERROR;
  let msg = err.message ? err.message : 'something went wrong!';

  //CAST ERRORS
  if (err.name === 'CastError') {
    statusCode = StatusCodes.NOT_FOUND;
    msg = `Resource Not Found - Invaild ${err.path}: ${err.value}`;
  }

  //DUPLICATION ERRORS
  if (err.code === 11000) {
    const errObj = err.keyValue;
    const errKey = Object.keys(errObj)[0];
    const errValue = Object.values(errObj)[0];

    statusCode = StatusCodes.BAD_REQUEST;
    msg = `Duplicate field value - ${errKey}: ${errValue}`;
  }

  //VALIDATION ERRORS
  if (err.name === 'ValidationError') {
    statusCode = StatusCodes.BAD_REQUEST;
  }

  res.status(statusCode).json({
    msg,
    err,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};
