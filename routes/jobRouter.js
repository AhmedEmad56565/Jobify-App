import { Router } from 'express';
const router = Router();

import {
  createJob,
  deleteJob,
  getAllJobs,
  getJob,
  updateJob,
  getMyJobs,
  getStats,
} from '../controllers/jobController.js';
import { idJobError } from '../middleware/idErrorMiddleware.js';
import { checkTestUsr } from '../middleware/authMiddleware.js';

router.route('/').get(getAllJobs).post(checkTestUsr, createJob);
router.get('/my-jobs', getMyJobs);
router.get('/stats', getStats);
router
  .route('/:id')
  .get(idJobError, getJob)
  .patch(checkTestUsr, idJobError, updateJob)
  .delete(checkTestUsr, idJobError, deleteJob);

export default router;
