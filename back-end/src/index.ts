import express from "express";
import jobsRouter from "./api/Jobs";
import { connectDb } from "./persistance/db";
import jobApplicationRouter from "./api/JobApplications";
import cors from "cors";
import GlobalErrorHandlerMiddleware from "./api/middlewares/Global-error-handling-middleware";

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const SECRET_KEY = process.env.CLERK_SECRET_KEY as string;

if (!SECRET_KEY) {
  throw new Error("Missing Secret Key");
}

connectDb();

app.use("/jobs", jobsRouter);
app.use("/jobApplications", jobApplicationRouter);

app.use(GlobalErrorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
