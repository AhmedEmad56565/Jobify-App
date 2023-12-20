import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

export function generateToken(res, userId) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
}

export function getResponse(res, user, statusCode = StatusCodes.OK) {
  const { __v, password, ...userData } = user._doc;
  res.status(statusCode).json({ ...userData });
}
