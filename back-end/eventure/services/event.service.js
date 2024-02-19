// event.service.js
const EventModel = require("../models/eventModel");
const mongoose = require('mongoose');

const createEvent = async (eventData) => {
  const event = new EventModel(eventData);
  await event.save();
  return event;
};

const getEventById = async (id) => {
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid Id");
  }
  const event = await EventModel.findById(id);
  if (!event) {
    throw new Error("Event not found");
  }
  return event;
};

const getEventsByUserId = async (userId) => {
  // Validate the userId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid Id");
  }

  // Get the current date to compare with event dates
  const currentDate = new Date();

  // Query for events related to the userId
  const events = await EventModel.find({
    $or: [
      { creatorId: userId },
      { eventManagerId: userId },
      { participants: userId },
    ],
  });

  if (!events) {
    throw new Error("Events not found");
  }

  // Separate the events into past and upcoming
  const pastEvents = events.filter(event => event.date < currentDate);
  const upcomingEvents = events.filter(event => event.date >= currentDate);

  // Return the separated events
  return { pastEvents, upcomingEvents };
};

const getAllEvents = async () => {
  const events = await EventModel.find({});
  return events;
};

const updateEvent = async (id, updates) => {
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid Id");
  }
  const event = await EventModel.findByIdAndUpdate(id, { $set: updates }, { new: true });
  if (!event) {
    throw new Error("Event not found or update failed");
  }
  return event;
};

const deleteEvent = async (id) => {
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid Id");
  }
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
  getEventsByUserId,
};
