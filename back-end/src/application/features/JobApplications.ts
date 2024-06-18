import { Request, Response, NextFunction } from "express";
import JobApplication from "../../persistance/entities/JobApplication";

export const createJobApplication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const jobApplication = req.body;
    await JobApplication.create(jobApplication);
    return res.status(201).send();
  } catch (error) {
    return next(error);
  }
};

export const getJobApplication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const jobApplication = await JobApplication.find().populate("job");
    return res.status(200).json(jobApplication);
  } catch (error) {
    return next(error);
  }
};
