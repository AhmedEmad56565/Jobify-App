import 'express-async-errors';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import express from 'express';
const app = express();
import morgan from 'morgan';
import mongoose from 'mongoose';

import jobRouter from './routes/jobRouter.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';

import { protect, admin } from './middleware/authMiddleware.js';
import { errHandler, notFound } from './middleware/errorHandler.js';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//ROUTERS
app.use('/api/v1/jobs', protect, jobRouter);
app.use('/api/v1/users', protect, userRouter);
app.use('/api/v1/auth', authRouter);

app.use('*', notFound);
app.use(errHandler);

const port = process.env.PORT || 5100;
try {
  await mongoose.connect(process.env.MONGO_URI);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
