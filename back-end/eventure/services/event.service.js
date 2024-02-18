// event.service.js
const EventModel = require("../models/eventModel");

const createEvent = async (eventData) => {
  const event = new EventModel(eventData);
  await event.save();
  return event;
};

const getEventById = async (id) => {
  const event = await EventModel.findById(id);
  if (!event) {
    throw new Error("Event not found");
  }
  return event;
};

const getAllEvents = async () => {
  const events = await EventModel.find({});
  return events;
};

const updateEvent = async (id, updates) => {
  const event = await EventModel.findByIdAndUpdate(id, { $set: updates }, { new: true });
  if (!event) {
    throw new Error("Event not found or update failed");
  }
  return event;
};

const deleteEvent = async (id) => {
  const event = await EventModel.findByIdAndDelete(id);
  if (!event) {
    throw new Error("Event not found or deletion failed");
  }
  return event;
};

module.exports = {
  createEvent,
  getEventById,
  getAllEvents,
  updateEvent,
  deleteEvent,
};
