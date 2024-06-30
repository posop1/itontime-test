import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
	{
		number: {
			type: Number,
			default: 0
		},
		title: {
			type: String,
			required: true
		},
		description: { type: String, required: true },
		tags: {
			type: Array
		},
		endDate: {
			type: Date
		}
	},
	{
		timestamps: true
	}
);

export default mongoose.model("Task", TaskSchema);
