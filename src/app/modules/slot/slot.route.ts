import express from 'express';
import { slotController } from './slot.controller';

const router = express.Router();

router.get('/availability', slotController.getAvailableSlots);

export const SlotRoutes = router;
