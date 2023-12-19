import Job from '../models/jobModel.js';
import AppError from '../utils/appError.js';
import { StatusCodes } from 'http-status-codes';

// @desc    fetch all jobs
// @route   GET /api/v1/jobs
// @access  private
export const getAllJobs = async (req, res, next) => {
  const jobs = await Job.find({});
  res.status(StatusCodes.OK).json(jobs);
};

// @desc    fetch a single all job
// @route   GET /api/v1/jobs/:id
// @access  private
export const getJob = async (req, res, next) => {
  const job = await Job.findById(req.params.id);

  res.status(StatusCodes.OK).json(job);
};

// @desc    create a job
// @route   POST /api/v1/jobs
// @access  private
export const createJob = async (req, res, next) => {
  const job = await Job.create(req.body);

  if (!job) {
    return next(new AppError('Error creating job!', StatusCodes.BAD_REQUEST));
  }

  res.status(StatusCodes.CREATED).json(job);
};

// @desc    update a job
// @route   PATCH /api/v1/jobs/:id
// @access  private
export const updateJob = async (req, res, next) => {
  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json(updatedJob);
};

export const deleteJob = async (req, res, next) => {
  const deletedJob = await Job.findByIdAndDelete(req.params.id);
  res
    .status(StatusCodes.OK)
    .json({ msg: 'Job deleted successfully.', deletedJob });
};
