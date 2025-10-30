import asyncHandler from 'express-async-handler';
import SwapRequest from '../models/SwapRequest.js';
import Event from '../models/Event.js';
import mongoose from 'mongoose';

// @desc    Get all swappable slots (excluding user's own)
// @route   GET /api/swappable-slots
// @access  Private
export const getSwappableSlots = asyncHandler(async (req, res) => {
  const swappableSlots = await Event.find({
    status: 'SWAPPABLE',
    userId: { $ne: req.user._id },
  })
    .populate('userId', 'name email')
    .sort({ startTime: 1 });

  res.json(swappableSlots);
});

// @desc    Create swap request
// @route   POST /api/swap-request
// @access  Private
export const createSwapRequest = asyncHandler(async (req, res) => {
  const { mySlotId, theirSlotId } = req.body;

  if (!mySlotId || !theirSlotId) {
    res.status(400);
    throw new Error('Please provide both slot IDs');
  }

  // Fetch both slots
  const mySlot = await Event.findById(mySlotId);
  const theirSlot = await Event.findById(theirSlotId);

  // Validate slots exist
  if (!mySlot || !theirSlot) {
    res.status(404);
    throw new Error('One or both slots not found');
  }

  // Validate ownership
  if (mySlot.userId.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('You can only swap your own slots');
  }

  // Validate both are swappable
  if (mySlot.status !== 'SWAPPABLE') {
    res.status(400);
    throw new Error('Your slot must be marked as SWAPPABLE');
  }

  if (theirSlot.status !== 'SWAPPABLE') {
    res.status(400);
    throw new Error('The requested slot is not available for swapping');
  }

  // Check if swap request already exists
  const existingRequest = await SwapRequest.findOne({
    mySlotId,
    theirSlotId,
    status: 'PENDING',
  });

  if (existingRequest) {
    res.status(400);
    throw new Error('Swap request already exists');
  }

  // Create swap request
  const swapRequest = await SwapRequest.create({
    requesterId: req.user._id,
    receiverId: theirSlot.userId,
    mySlotId,
    theirSlotId,
    status: 'PENDING',
  });

  // Update both slots to SWAP_PENDING
  mySlot.status = 'SWAP_PENDING';
  theirSlot.status = 'SWAP_PENDING';

  await mySlot.save();
  await theirSlot.save();

  const populatedRequest = await SwapRequest.findById(swapRequest._id)
    .populate('requesterId', 'name email')
    .populate('receiverId', 'name email')
    .populate('mySlotId')
    .populate('theirSlotId');

  res.status(201).json(populatedRequest);
});

// @desc    Respond to swap request (accept/reject)
// @route   POST /api/swap-response/:id
// @access  Private
export const respondToSwapRequest = asyncHandler(async (req, res) => {
  const { accepted } = req.body;

  if (typeof accepted !== 'boolean') {
    res.status(400);
    throw new Error('Please provide accepted status (true/false)');
  }

  const swapRequest = await SwapRequest.findById(req.params.id)
    .populate('mySlotId')
    .populate('theirSlotId');

  if (!swapRequest) {
    res.status(404);
    throw new Error('Swap request not found');
  }

  // Check if user is the receiver
  if (swapRequest.receiverId.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to respond to this request');
  }

  // Check if already responded
  if (swapRequest.status !== 'PENDING') {
    res.status(400);
    throw new Error('This request has already been responded to');
  }

  const mySlot = swapRequest.mySlotId;
  const theirSlot = swapRequest.theirSlotId;

  if (accepted) {
    // ACCEPT: Swap the userIds
    const tempUserId = mySlot.userId;
    mySlot.userId = theirSlot.userId;
    theirSlot.userId = tempUserId;

    // Set both to BUSY
    mySlot.status = 'BUSY';
    theirSlot.status = 'BUSY';

    swapRequest.status = 'ACCEPTED';
  } else {
    // REJECT: Return both to SWAPPABLE
    mySlot.status = 'SWAPPABLE';
    theirSlot.status = 'SWAPPABLE';

    swapRequest.status = 'REJECTED';
  }

  await mySlot.save();
  await theirSlot.save();
  await swapRequest.save();

  const populatedRequest = await SwapRequest.findById(swapRequest._id)
    .populate('requesterId', 'name email')
    .populate('receiverId', 'name email')
    .populate('mySlotId')
    .populate('theirSlotId');

  res.json(populatedRequest);
});

// @desc    Get incoming swap requests
// @route   GET /api/swap-requests/incoming
// @access  Private
export const getIncomingRequests = asyncHandler(async (req, res) => {
  const requests = await SwapRequest.find({
    receiverId: req.user._id,
  })
    .populate('requesterId', 'name email')
    .populate('receiverId', 'name email')
    .populate('mySlotId')
    .populate('theirSlotId')
    .sort({ createdAt: -1 });

  res.json(requests);
});

// @desc    Get outgoing swap requests
// @route   GET /api/swap-requests/outgoing
// @access  Private
export const getOutgoingRequests = asyncHandler(async (req, res) => {
  const requests = await SwapRequest.find({
    requesterId: req.user._id,
  })
    .populate('requesterId', 'name email')
    .populate('receiverId', 'name email')
    .populate('mySlotId')
    .populate('theirSlotId')
    .sort({ createdAt: -1 });

  res.json(requests);
});
