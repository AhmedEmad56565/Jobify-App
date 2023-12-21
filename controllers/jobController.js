import Job from '../models/jobModel.js';
import AppError from '../utils/appError.js';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import day from 'dayjs';

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
  const job = await Job.create({ createdBy: req.user._id, ...req.body });

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

// @desc    fetch users jobs
// @route   GET /api/v1/jobs/my-jobs
// @access  private
export const getMyJobs = async (req, res, next) => {
  const jobs = await Job.find({ createdBy: req.user._id });
  res.status(StatusCodes.OK).json(jobs);
};

// @desc    get jobs stats
// @route   GET /api/v1/jobs/stats
// @access  private
export const getStats = async (req, res, next) => {
  let stats = await Job.aggregate([
    {
      $match: { createdBy: req.user._id },
    },
    {
      $group: {
        _id: '$jobStatus',
        count: { $sum: 1 },
      },
    },
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  let monthlyApplications = await Job.aggregate([
    {
      $match: { createdBy: req.user._id },
    },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { '_id.year': -1, '_id.month': -1 },
    },
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = day()
        .month(month - 1)
        .year(year)
        .format('MMM YY');

      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
