import { Router } from 'express';
const router = Router();

import { login, logout, register } from '../controllers/authController.js';
import { idUserError } from '../middleware/idErrorMiddleware.js';

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').post(logout);

export default router;
