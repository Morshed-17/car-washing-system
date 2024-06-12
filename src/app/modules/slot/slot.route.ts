import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SlotValidations } from './slot.validation';
import { SlotControllers } from './slot.controller';


const router = express.Router();

router.post(
  '/',
  validateRequest(SlotValidations.createSlotValidationSchema),
  SlotControllers.createSlot,
);
router.get('/:id', SlotControllers.getSingleSlot);
router.get('/', SlotControllers.getAllSlots);

// router.put(
//   '/:id',
//   validateRequest(SlotValidations.upda),

//   SlotControllers.updateService,
// );
// router.delete('/:id', SlotControllers.deleteService);

export const SlotRoutes = router;
