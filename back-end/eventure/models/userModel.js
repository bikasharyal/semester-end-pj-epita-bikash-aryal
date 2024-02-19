// models/userModel.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['normal', 'admin', 'superadmin'],
      default: 'normal'
    },
    contact: String,
    address: String,
    preferences: String,
    needPasswordUpdate: {
      type: Boolean,
      default: false // Set a default value for isActive
    },
    isActive: {
      type: Boolean,
      default: true // Set a default value for isActive
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("User", userSchema);
