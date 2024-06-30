import { Request, Response } from "express";
import { logger } from "../../libs/logger";
import Task from "./task.model";
import { ICreateTaskBody, IUpdateTaskBody } from "./types";

export async function getTasks(req: Request, res: Response) {
	try {
		const tasks = await Task.find();

		if (!tasks) {
			return res.status(404).json({ message: "Задачи не найдены" });
		}

		res.status(200).json(tasks);
	} catch (error) {
		logger.error("getTasks error:", error);
		res.status(500).json({ message: "Ошибка" });
	}
}

export async function createTask(req: Request<never, never, ICreateTaskBody>, res: Response) {
	try {
		const { title, description, tags, endDate } = req.body;

		const tasks = await Task.find();

		let newTask;

		if (tags && endDate) {
			newTask = new Task({
				title,
				description,
				number: tasks.length + 1,
				tags,
				endDate
			});
		} else if (endDate) {
			newTask = new Task({
				title,
				description,
				number: tasks.length + 1,
				endDate
			});
		} else if (tags) {
			newTask = new Task({
				title,
				description,
				number: tasks.length + 1,
				tags
			});
		} else {
			newTask = new Task({
				title,
				description,
				number: tasks.length + 1
			});
		}

		await newTask.save();

		res.status(200).json(newTask);
	} catch (error) {
		logger.error("createTask error:", error);
		res.status(500).json({ message: "Ошибка" });
	}
}

export async function updateTask(
	req: Request<{ id: string }, never, IUpdateTaskBody>,
	res: Response
) {
	try {
		const { id } = req.params;

		const task = await Task.findByIdAndUpdate(id, req.body);

		if (!task) {
			return res.status(404).json({ message: "Задача не найдены" });
		}

		const updatedTask = await Task.findById(id);
		res.status(200).json(updatedTask);
	} catch (error) {
		logger.error("updateTask error:", error);
		res.status(500).json({ message: "Ошибка" });
	}
}

export async function deleteTask(req: Request<{ id: string }>, res: Response) {
	try {
		const { id } = req.params;

		const task = await Task.findByIdAndDelete(id);

		if (!task) {
			return res.status(404).json({ message: "Задача не найдены" });
		}

		res.status(200).json(task);
	} catch (error) {
		logger.error("deleteTask error:", error);
		res.status(500).json({ message: "Ошибка" });
	}
}
