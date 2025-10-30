import express from 'express';
import {
  getSwappableSlots,
  createSwapRequest,
  respondToSwapRequest,
  getIncomingRequests,
  getOutgoingRequests,
} from '../controllers/swapController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/swappable-slots', protect, getSwappableSlots);
router.post('/swap-request', protect, createSwapRequest);
router.post('/swap-response/:id', protect, respondToSwapRequest);
router.get('/swap-requests/incoming', protect, getIncomingRequests);
router.get('/swap-requests/outgoing', protect, getOutgoingRequests);

export default router;
