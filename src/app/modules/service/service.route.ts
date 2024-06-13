import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ServiceValidations } from './service.validation';
import { ServiceControllers } from './service.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/',
  auth('admin'),
  validateRequest(ServiceValidations.createServiceValidationSchema),
  ServiceControllers.createService,
);
router.get('/:id', ServiceControllers.getSingleService);
router.get('/', ServiceControllers.getAllServices);
router.put(
  '/:id',
  auth('admin'),
  validateRequest(ServiceValidations.updateServiceValidationSchema),

  ServiceControllers.updateService,
);
router.delete('/:id', ServiceControllers.deleteService);

export const ServiceRoutes = router;
