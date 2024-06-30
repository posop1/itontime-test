/* eslint-disable no-undef */
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { httpLogger, logger } from "./libs/logger";
import { connectDatabase } from "./libs/mongodb";
import { taskRouter } from "./app";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(httpLogger);

app.use("/task", taskRouter);

const startServer = async () => {
	try {
		app.listen(PORT, () => {
			logger.info(`Server listening port:${PORT}`);
		});
		connectDatabase();
	} catch (error) {
		logger.error(error);
	}
};

startServer();
