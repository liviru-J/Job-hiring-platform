import express from "express";
import { createJob, getJobs, getOneJob } from "../application/features/Jobs";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const jobsRouter = express.Router();

jobsRouter.route("/").get(getJobs).post(ClerkExpressRequireAuth({}),createJob);

jobsRouter.route("/:id").get(ClerkExpressRequireAuth({}),getOneJob);

export default jobsRouter;
