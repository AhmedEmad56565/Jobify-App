import { Router } from 'express';
const router = Router();

import {
  createJob,
  deleteJob,
  getAllJobs,
  getJob,
  updateJob,
} from '../controllers/jobController.js';
import { idError } from '../middleware/idErrorMiddleware.js';

router.route('/').get(getAllJobs).post(createJob);
router
  .route('/:id')
  .get(idError, getJob)
  .patch(idError, updateJob)
  .delete(idError, deleteJob);

export default router;
