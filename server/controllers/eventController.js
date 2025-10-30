import asyncHandler from 'express-async-handler';
import Event from '../models/Event.js';

// @desc    Create new event
// @route   POST /api/events
// @access  Private
export const createEvent = asyncHandler(async (req, res) => {
  const { title, startTime, endTime, status } = req.body;

  if (!title || !startTime || !endTime) {
    res.status(400);
    throw new Error('Please provide title, startTime, and endTime');
  }

  const event = await Event.create({
    title,
    startTime,
    endTime,
    status: status || 'BUSY',
    userId: req.user._id,
  });

  res.status(201).json(event);
});

// @desc    Get all events for logged-in user
// @route   GET /api/events
// @access  Private
export const getMyEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({ userId: req.user._id }).sort({
    startTime: 1,
  });
  res.json(events);
});

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private
export const updateEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404);
    throw new Error('Event not found');
  }

  // Check if user owns the event
  if (event.userId.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to update this event');
  }

  // Update fields
  event.title = req.body.title || event.title;
  event.startTime = req.body.startTime || event.startTime;
  event.endTime = req.body.endTime || event.endTime;
  event.status = req.body.status || event.status;

  const updatedEvent = await event.save();
  res.json(updatedEvent);
});

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private
export const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404);
    throw new Error('Event not found');
  }

  // Check if user owns the event
  if (event.userId.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to delete this event');
  }

  await event.deleteOne();
  res.json({ message: 'Event deleted successfully' });
});
