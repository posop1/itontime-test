import { Router } from "express";
import { createTask, deleteTask, getTasks, updateTask } from "./task.controller";

const router = Router();

router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export const taskRouter = router;
