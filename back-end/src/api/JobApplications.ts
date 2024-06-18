import express from "express";
import {
  createJobApplication,
  getJobApplication,
} from "../application/features/JobApplications";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const jobApplicationRouter = express.Router();

jobApplicationRouter
  .route("/")
  .get(ClerkExpressRequireAuth({}), getJobApplication)
  .post(ClerkExpressRequireAuth({}), createJobApplication);

export default jobApplicationRouter;
