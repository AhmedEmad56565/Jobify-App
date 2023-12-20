import { Router } from 'express';
const router = Router();

import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from '../controllers/userController.js';

import { admin } from '../middleware/authMiddleware.js';

router.get('/current-user', getCurrentUser);
router.get('/admin/app-stats', admin, getApplicationStats);
router.patch('/update-user', updateUser);

export default router;
