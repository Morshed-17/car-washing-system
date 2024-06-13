import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SlotValidations } from './slot.validation';
import { SlotControllers } from './slot.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/',
  auth('admin'),
  validateRequest(SlotValidations.createSlotValidationSchema),

  SlotControllers.createSlot,
);

router.get('/availability', auth('user'), SlotControllers.getAvailableSlots);

export const SlotRoutes = router;
