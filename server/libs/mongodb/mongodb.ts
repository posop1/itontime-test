import { logger } from "../../libs/logger";
import mongoose from "mongoose";

export const connectDatabase = async () => {
	try {
		mongoose.set("strictQuery", false);
		mongoose.connect(process.env.DATABASE_URL!);
		logger.info("Database connected.");
	} catch (error) {
		logger.error(error);
	}
};
