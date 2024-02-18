// models/message.js
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event'
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false // Making this optional for public messages
    },
    text: String,
    timestamp: Date,
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

module.exports = mongoose.model("Message", messageSchema);
