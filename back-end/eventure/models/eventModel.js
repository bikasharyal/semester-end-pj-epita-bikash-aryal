// models/eventModel.js
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    date: Date,
    location: String,
    type: String,
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    eventManagerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    tasks: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task'
    }],
    agenda: String,
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

module.exports = mongoose.model("Event", eventSchema);
