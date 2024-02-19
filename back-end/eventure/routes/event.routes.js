// event.routes.js
const express = require("express");
const router = express.Router();
const eventService = require("../services/event.service");

// Create Event
router.post("/", async (req, res) => {
  try {
    const event = await eventService.createEvent(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Event by ID
router.get("/:id", async (req, res) => {
  try {
    const event = await eventService.getEventById(req.params.id);
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Events
router.get("/", async (req, res) => {
  try {
    const events = await eventService.getAllEvents();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Events by userId
router.get("/byUserId/:id", async (req, res) => {
  try {
    const events = await eventService.getEventsByUserId(req.params.id);
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Event
router.put("/:id", async (req, res) => {
  try {
    const updatedEvent = await eventService.updateEvent(req.params.id, req.body);
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Event
router.delete("/:id", async (req, res) => {
  try {
    const deletedEvent = await eventService.deleteEvent(req.params.id);
    res.status(200).json(deletedEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
