import ErrorHandler from "../middlewares/errors.js";
import { TaskModel } from "../models/tasks.js";

export const newTask = async (req, res, next) => {
    try {
        const { title, description } = req.body;

        await TaskModel.create({ title, description, user: req.user._id });
        res.status(201).json({
            success: true,
            message: "Task created successfully"
        })
    } catch (error) {
        next(error);
    }
}

export const getMyTask = async (req, res, next) => {
    try {
        const user = await TaskModel.find({ user: req.user._id });
        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        next(error);
    }
}


export const taskUpdate = async (req, res, next) => {
    try {
        const task = await TaskModel.findById(req.params.id);
        if (!task) return next(new ErrorHandler(404, "Task not found"));
        task.isFinished = !(task.isFinished);
        await task.save();
        res.status(200).json({
            success: true,
            message: "Taks Updated Sucessfully"
        })
    } catch (error) {
        next(error);
    }
}

export const taskDelete = async (req, res, next) => {
    try {
        const task = await TaskModel.findById(req.params.id);
        if (!task) return next(new ErrorHandler(404, "Task not found"));
        await task.deleteOne();
        res.status(200).json({
            success: true,
            message: "Taks Deleted Sucessfully"
        })
    } catch (error) {
        next(error)
    }
}
