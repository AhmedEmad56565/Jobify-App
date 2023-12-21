import mongoose from 'mongoose';
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js';

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'company field can not be empty!'],
      maxLength: [30, 'company field can not be more than 20 characters!'],
      trim: true,
    },

    position: {
      type: String,
      required: [true, 'position field can not be empty!'],
      maxLength: [30, 'position field can not be more than 20 characters!'],
      trim: true,
    },

    jobStatus: {
      type: String,
      enum: {
        values: Object.values(JOB_STATUS),
        message: 'job status is either (interview) or (declined) or (pending)!',
      },
      default: JOB_STATUS.PENDING,
    },

    jobType: {
      type: String,
      enum: {
        values: Object.values(JOB_TYPE),
        message:
          'job type is either (full-time) or (part-time) or (internship)!',
      },
      default: JOB_TYPE.FULL_TIME,
    },

    jobLocation: {
      type: String,
      required: [true, 'job location field can not be empty!'],
      default: 'my city',
      maxLength: [30, 'job location field can not be more than 20 characters!'],
      trim: true,
    },

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'job createdBy field can not be empty!'],
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model('Job', jobSchema);
export default Job;
