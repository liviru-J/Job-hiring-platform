import express from "express";
import {
  createJobApplication,
  getJobApplication,
  getJobApplicationById,
} from "../application/features/JobApplications";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import AuthorizationMiddleware from "./middlewares/Authorization-middleware";

const jobApplicationRouter = express.Router();

jobApplicationRouter
  .route("/")
  .get(ClerkExpressRequireAuth({}), AuthorizationMiddleware, getJobApplication)
  .post(ClerkExpressRequireAuth({}), createJobApplication);

jobApplicationRouter
  .route("/:id")
  .get(
    ClerkExpressRequireAuth({}),
    AuthorizationMiddleware,
    getJobApplicationById
  );

export default jobApplicationRouter;
