import { Router } from 'express';
const router = Router();

import {
  createJob,
  deleteJob,
  getAllJobs,
  getJob,
  updateJob,
  getMyJobs,
} from '../controllers/jobController.js';
import { idJobError } from '../middleware/idErrorMiddleware.js';
// import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getAllJobs).post(createJob);
router.get('/my-jobs', getMyJobs);
router
  .route('/:id')
  .get(idJobError, getJob)
  .patch(idJobError, updateJob)
  .delete(idJobError, deleteJob);

export default router;
