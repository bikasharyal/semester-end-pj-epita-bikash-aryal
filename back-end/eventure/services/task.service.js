// task.service.js
const TaskModel = require("../models/taskModel");

const createTask = async (taskData) => {
  const task = new TaskModel(taskData);
  await task.save();
  return task;
};

const getTaskById = async (id) => {
  const task = await TaskModel.findById(id).populate('assignedTo', 'name -_id').populate('eventId', 'title -_id');
  if (!task) {
    throw new Error("Task not found");
  }
  return task;
};

const getAllTasks = async () => {
  const tasks = await TaskModel.find({});
  return tasks;
};

const updateTask = async (id, updates) => {
  const task = await TaskModel.findByIdAndUpdate(id, { $set: updates }, { new: true });
  if (!task) {
    throw new Error("Task not found or update failed");
  }
  return task;
};

const deleteTask = async (id) => {
  const task = await TaskModel.findByIdAndDelete(id);
  if (!task) {
    throw new Error("Task not found or deletion failed");
  }
  return task;
};

module.exports = {
  createTask,
  getTaskById,
  getAllTasks,
  updateTask,
  deleteTask,
};
