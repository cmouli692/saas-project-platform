import {z} from "zod";

export const createTaskSchema = z.object({
    title : z.string().min(1, "Task title is required"),
    completed: z.boolean().optional(),
});