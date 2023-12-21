import { Router } from 'express';
const router = Router();

import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from '../controllers/userController.js';

import { admin, checkTestUsr } from '../middleware/authMiddleware.js';
import upload from '../middleware/multerMiddleware.js';

router.get('/current-user', getCurrentUser);
router.get('/admin/app-stats', admin, getApplicationStats);
router.patch('/update-user', checkTestUsr, upload.single('avatar'), updateUser);

export default router;
