// models/taskModel.js
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    status: {
      type: String,
      enum: ['pending', 'completed', 'onhold', 'canceled'], // Define the enum with the acceptable values
      default: 'pending' // You can set a default status
    },
    deadline: Date,
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event'
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    isActive: {
      type: Boolean,
      default: true // Set a default value for isActive
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

module.exports = mongoose.model("Task", taskSchema);
