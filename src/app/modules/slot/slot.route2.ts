import express from 'express';
import { SlotControllers } from './slot.controller';

const router = express.Router();

router.get('/', SlotControllers.getAvailableSlots);

export const SlotRoutes2 = router;
