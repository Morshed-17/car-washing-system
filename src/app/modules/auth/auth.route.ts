import express from 'express';
import { AuthControllers } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from '../User/user.validation';
import { AuthValidations } from './auth.validation';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidations.createUserValidationSchema),
  AuthControllers.signUp,
);
router.post(
  '/login',
  validateRequest(AuthValidations.loginValidationSchema),
  AuthControllers.login,
);

router.put(
  '/update-user/:id',

  AuthControllers.updateUser,
);
router.get(
  '/user/:id',

  AuthControllers.getSingleUser,
);

export const AuthRoutes = router;
