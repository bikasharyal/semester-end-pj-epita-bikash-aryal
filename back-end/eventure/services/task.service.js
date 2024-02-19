// task.service.js
const TaskModel = require("../models/taskModel");
const mongoose = require('mongoose');

const createTask = async (taskData) => {
  const task = new TaskModel(taskData);
  await task.save();
  return task;
};

const getTaskById = async (id) => {
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid Id");
  }
  const task = await TaskModel.findById(id);
  if (!task) {
    throw new Error("Task not found");
  }
  return task;
};

const getAllTasks = async () => {
  const tasks = await TaskModel.find({})
    .populate({
      path: 'assignedTo',
      select: 'name' 
    })
    .populate({
      path: 'eventId',
      select: 'title'
    })
    .lean(); // Convert Mongoose documents to plain JavaScript objects

  // Map over tasks to rename fields for frontend consumption
  const modifiedTasks = tasks.map(task => ({
    ...task,
    assignedToName: task.assignedTo ? task.assignedTo.name : null, // Handle potential null values
    eventName: task.eventId ? task.eventId.title : null
  }));

  return modifiedTasks;
};

const getAllUserTasks = async (userId) => {
   // Validate the userId
   if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid Id");
  }
  const currentDate = new Date();

  const tasks = await TaskModel.find({
    assignedTo: userId,
    deadline: { $gte: currentDate }
  })
  .populate({
    path: 'assignedTo',
    select: 'name' 
  })
  .populate({
    path: 'eventId',
    select: 'title'
  })
  .lean();
  
  // Map over tasks to rename fields for frontend consumption
  const modifiedTasks = tasks.map(task => ({
    ...task,
    assignedToName: task.assignedTo ? task.assignedTo.name : null, // Handle potential null values
    eventName: task.eventId ? task.eventId.title : null
  }));

  return modifiedTasks;
};


const updateTask = async (id, updates) => {
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid Id");
  }
  const task = await TaskModel.findByIdAndUpdate(id, { $set: updates }, { new: true });
  if (!task) {
    throw new Error("Task not found or update failed");
  }
  return task;
};

const deleteTask = async (id) => {
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid Id");
  }
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
  getAllUserTasks,
};
