import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ServiceValidations } from './service.validation';
import { ServiceControllers } from './service.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(ServiceValidations.createServiceValidationSchema),
  ServiceControllers.createService,
);
router.get('/:id', ServiceControllers.getSingleService);
router.get('/', ServiceControllers.getAllServices);

export const ServiceRoutes = router;
