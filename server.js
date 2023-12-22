import 'express-async-errors';
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import morgan from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary';

//ROUTES
import jobRouter from './routes/jobRouter.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';

//PUBLIC
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

//MIDDLEWARE
import { protect } from './middleware/authMiddleware.js';
import { errHandler, notFound } from './middleware/errorHandler.js';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//MORGAN SETUP
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, './client/dist')));

app.use(cookieParser());
app.use(express.json());

//ROUTERS
app.use('/api/v1/jobs', protect, jobRouter);
app.use('/api/v1/users', protect, userRouter);
app.use('/api/v1/auth', authRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'));
});

//ERROR MIDDLEWARE
app.use('*', notFound);
app.use(errHandler);

//SERVER AND DB CONNECTION
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
